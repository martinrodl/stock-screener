import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StocksRepository } from '../repositories';
import { StocksService } from './stocks.service';
import { StatementsService } from './statements.service';
import { CountedService } from './counted.service';
import { OutlookService } from './outlook.service';
import { AnalystRatingsService } from './analyst-ratings.service';
import { MetricsService } from './metrics.service';
import { ETFService } from './etf.service';
import { StockExchange, PeriodType } from '../enums';
import { delay } from '@utils/index';
import { ProgressRepository } from '../../other/repositories';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    private readonly stocksService: StocksService,
    private readonly statementsService: StatementsService,
    private readonly stocksRepository: StocksRepository,
    private readonly countedService: CountedService,
    private readonly outlookService: OutlookService,
    private readonly analystRatingsService: AnalystRatingsService,
    private readonly metricsService: MetricsService,
    private readonly progressRepository: ProgressRepository,
    private readonly etfService: ETFService,
  ) {}

  @Cron('0 * * * *') // Cron run every hour
  async updateStocksList() {
    console.log('Running scheduled task to update stock lists');
    const stockExchanges = Object.values(StockExchange);
    for (const exchange of stockExchanges) {
      try {
        await delay(1000); // Add a delay of 1 second before each API call
        await this.stocksService.updateStocksList(exchange);
        console.log(`Successfully updated stocks list for ${exchange}`);
      } catch (error) {
        console.error(`Failed to update stocks list for ${exchange}`, error);
      }
    }
  }

  @Cron('0 0 1,15 * *') // This cron expression runs at midnight on the 1st and 15th of every month
  async handleStatementsUpdateCron() {
    console.log('Running scheduled task to update statements');
    for await (const stock of this.stocksRepository.getStockStream()) {
      try {
        await delay(1000); // Add a delay of 1 second before each API call
        await this.statementsService.saveStatements(stock.symbol);
        console.log(`Successfully updated statements for ${stock.symbol}`);
      } catch (error) {
        console.error(`Failed to update statements for ${stock.symbol}`, error);
      }
    }
  }

  @Cron('0 0 1,15 * *') // This cron expression runs at midnight on the 1st and 15th of every month
  async handleMetricsUpdateCron() {
    console.log('Running scheduled task to update metrics');
    for await (const stock of this.stocksRepository.getStockStream()) {
      try {
        await delay(1000); // Add a delay of 1 second before each API call
        await this.metricsService.saveMetrics(stock.symbol);
        console.log(`Successfully updated metrics for ${stock.symbol}`);
      } catch (error) {
        console.error(`Failed to update metrics for ${stock.symbol}`, error);
      }
    }
  }

  @Cron('0 0 1 * *') // This cron expression runs at midnight on the 1st of every month
  async handleOutlookUpdateCron() {
    console.log('Running scheduled task to update outlook');
    for await (const stock of this.stocksRepository.getStockStream()) {
      try {
        await delay(1000); // Add a delay of 1 second before each API call
        await this.analystRatingsService.saveAnalystRatings(stock.symbol);
        console.log(`Successfully updated outlook for ${stock.symbol}`);
      } catch (error) {
        console.error(`Failed to update outlook for ${stock.symbol}`, error);
      }
    }
  }

  @Cron('0 0 1 * *') // This cron expression runs at midnight on the 1st of every month
  async handleCountedUpdateCron() {
    console.log('Running scheduled task to update counted');
    for await (const stock of this.stocksRepository.getStockStream()) {
      try {
        await delay(1000); // Add a delay of 1 second before each API call
        await this.outlookService.saveOutlookData(stock.symbol);
        console.log(`Successfully updated counted for ${stock.symbol}`);
      } catch (error) {
        console.error(`Failed to update counted for ${stock.symbol}`, error);
      }
    }
  }

  async updateAllStockValues() {
    console.log('Running task to update all stock values');

    const lastProgress = await this.progressRepository.getProgress(
      'updateAllStockValues',
    );
    console.log('lastProgress', lastProgress);
    const lastProcessedSymbol = lastProgress ? lastProgress.symbol : null;

    let started = !lastProcessedSymbol; // If there's no progress, start from the beginning

    for await (const stock of this.stocksRepository.getStockStream()) {
      if (!started && stock.symbol === lastProcessedSymbol) {
        started = true; // Start processing from the next stock after the last processed one
      }

      if (started) {
        try {
          console.log('Updating stock values for ', stock.symbol);
          const { profile } = await this.outlookService.saveOutlookData(
            stock.symbol,
          );
          console.log('Outlook updated');
          const { isEtf, isFund } = profile;
          if (isEtf) {
            console.log(`Updating ETF information for ${stock.symbol}`);
            await this.etfService.updateETFInformation(stock.symbol);
            console.log(
              `Successfully updated ETF information for ${stock.symbol}`,
            );
          }
          if (!(isEtf || isFund)) {
            await delay(100);
            await this.statementsService.saveStatements(stock.symbol);
            console.log('Statements updated');
            await delay(100);
            await this.metricsService.saveMetrics(stock.symbol);
            console.log('Metrics updated');
            await delay(100);
            await this.analystRatingsService.saveAnalystRatings(stock.symbol);
            console.log('Ratings updated');
            await delay(1000);
            await this.countedService.updateStockValues(
              stock.symbol,
              PeriodType.ANNUAL,
            );
            console.log('Counted values updated');
          }
          await delay(250);

          console.log(`Successfully updated stock values for ${stock.symbol}`);

          // Save progress after successfully updating stock values
          await this.progressRepository.saveProgress(
            'updateAllStockValues',
            stock.symbol,
          );
        } catch (error) {
          console.error(
            `Failed to update stock values for ${stock.symbol}`,
            error,
          );
        }
      }
    }

    // Clear the progress after completing the task
    await this.progressRepository.clearProgress('updateAllStockValues');
  }

  async onModuleInit() {
    console.log('Module initialized. Checking for any last progress...');

    // Check if there is any progress from the last run
    const lastProgress = await this.progressRepository.getProgress(
      'updateAllStockValues',
    );

    if (lastProgress) {
      console.log(
        'Found progress from the last run. Resuming updateAllStockValues...',
      );

      setTimeout(() => {
        this.updateAllStockValues(); // Resume the task
      }, 0);
    }
    console.log('Finish onModuleInit. ');
  }
}
