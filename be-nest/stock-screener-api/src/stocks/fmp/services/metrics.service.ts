import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MetricsRepository } from '../repositories/metrics.repository';
import { StocksService } from '../../stocks.service';
import { StockDocument } from '../../schemas/stock.schema';
import { CombinedData } from '../interfaces/combined-data.interface';

@Injectable()
export class MetricsService {
  private readonly apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
  ) {}

  async fetchMetrics(symbol: string) {
    const keyMetricsUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?apikey=${this.apiKey}`;
    const incomeGrowthMetricsUrl = `https://financialmodelingprep.com/api/v3/income-statement-growth/${symbol}?apikey=${this.apiKey}`;
    const profitGrowthMetricsUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement-growth/${symbol}?apikey=${this.apiKey}`;

    const [keyMetrics, incomeGrowthMetrics, profitGrowthMetrics] =
      await Promise.all([
        firstValueFrom(this.httpService.get(keyMetricsUrl)),
        firstValueFrom(this.httpService.get(incomeGrowthMetricsUrl)),
        firstValueFrom(this.httpService.get(profitGrowthMetricsUrl)),
      ]);

    return {
      keyMetrics: keyMetrics.data,
      incomeGrowthMetrics: incomeGrowthMetrics.data,
      profitGrowthMetrics: profitGrowthMetrics.data,
    };
  }

  async saveMetrics(symbol: string) {
    const metrics = await this.fetchMetrics(symbol);
    const stock = await this.stocksService.getStock(symbol);

    const keyMetrics = metrics.keyMetrics.map((metric) => ({
      ...metric,
      stock: (stock as StockDocument)._id,
    }));

    const incomeGrowthMetrics = metrics.incomeGrowthMetrics.map((metric) => ({
      ...metric,
      stock: (stock as StockDocument)._id,
    }));

    const profitGrowthMetrics = metrics.profitGrowthMetrics.map((metric) => ({
      ...metric,
      stock: (stock as StockDocument)._id,
    }));

    await this.metricsRepository.insertManyIfNotExists(
      keyMetrics,
      incomeGrowthMetrics,
      profitGrowthMetrics,
    );
  }

  async getCombinedData(
    symbol: string,
    periodType: string,
    properties: string[],
  ) {
    const stock = await this.stocksService.getStock(symbol);
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const filter =
      periodType === 'annual'
        ? { stock: (stock as StockDocument)._id, period: 'FY' }
        : {
            stock: (stock as StockDocument)._id,
            period: { $in: ['Q1', 'Q2', 'Q3', 'Q4'] },
          };

    const keyMetrics = await this.metricsRepository.findKeyMetrics(filter);
    const incomeGrowthMetrics =
      await this.metricsRepository.findIncomeGrowthMetrics(filter);
    const profitGrowthMetrics =
      await this.metricsRepository.findProfitGrowthMetrics(filter);

    const combinedData: { [key: string]: CombinedData } = {};

    const combineMetrics = (metrics) => {
      metrics.forEach((metric) => {
        const key = `${metric.date}-${metric.period}`;
        if (!combinedData[key])
          combinedData[key] = {
            date: metric.date,
            period: metric.period,
          };
        properties.forEach((prop) => {
          if (metric[prop] !== undefined)
            combinedData[key][prop] = metric[prop];
        });
      });
    };

    combineMetrics(keyMetrics);
    combineMetrics(incomeGrowthMetrics);
    combineMetrics(profitGrowthMetrics);

    const sortedData = Object.values(combinedData).sort((a, b) => {
      // Sort by date first
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison !== 0) return dateComparison;
      // If dates are the same, sort by period
      const periodOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4, FY: 5 };
      return periodOrder[b.period] - periodOrder[a.period];
    });

    return sortedData;
  }
}
