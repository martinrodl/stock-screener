import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StocksRepository } from '../repositories';
import { StocksService } from './stocks.service';
import { StatementsService } from './statements.service';
import { CountedService } from './counted.service';
import { OutlookService } from './outlook.service';
import { AnalystRatingsService } from './analyst-ratings.service';
import { MetricsService } from './metrics.service';
import { StockExchange } from '../enums';
import { delay } from '@utils/index';

@Injectable()
export class CronService {
  constructor(
    private readonly stocksService: StocksService,
    private readonly statementsService: StatementsService,
    private readonly stocksRepository: StocksRepository,
    private readonly countedService: CountedService,
    private readonly outlookService: OutlookService,
    private readonly analystRatingsService: AnalystRatingsService,
    private readonly metricsService: MetricsService,
  ) {}

  @Cron('0 0 1 1 *') // every month on the 1st
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

  @Cron('0 0 * * *') // This cron expression runs at midnight every day
  async handleUpdateStockValuesCron() {
    console.log('Running scheduled task to update stock values');
    for await (const stock of this.stocksRepository.getStockStream()) {
      try {
        await delay(1000); // Add a delay of 1 second before each API call
        await this.countedService.updateStockValues(stock.symbol, 'annual');
        await delay(1000); // Add another delay for the next API call
        await this.countedService.updateStockValues(stock.symbol, 'quarter');
        console.log(`Successfully updated stock values for ${stock.symbol}`);
      } catch (error) {
        console.error(
          `Failed to update stock values for ${stock.symbol}`,
          error,
        );
      }
    }
  }
}
