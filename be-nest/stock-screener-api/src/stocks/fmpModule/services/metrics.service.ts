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
    const keyMetricsQuarterlyUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?period=quarter&apikey=${this.apiKey}`;
    const keyMetricsAnnualUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?apikey=${this.apiKey}`;
    const incomeGrowthMetricsQuarterlyUrl = `https://financialmodelingprep.com/api/v3/income-statement-growth/${symbol}?period=quarter&apikey=${this.apiKey}`;
    const incomeGrowthMetricsAnnualUrl = `https://financialmodelingprep.com/api/v3/income-statement-growth/${symbol}?apikey=${this.apiKey}`;
    const profitGrowthMetricsQuarterlyUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement-growth/${symbol}?period=quarter&apikey=${this.apiKey}`;
    const profitGrowthMetricsAnnualUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement-growth/${symbol}?apikey=${this.apiKey}`;

    const [
      keyMetricsQuarterly,
      keyMetricsAnnual,
      incomeGrowthMetricsQuarterly,
      incomeGrowthMetricsAnnual,
      profitGrowthMetricsQuarterly,
      profitGrowthMetricsAnnual,
    ] = await Promise.all([
      firstValueFrom(this.httpService.get(keyMetricsQuarterlyUrl)),
      firstValueFrom(this.httpService.get(keyMetricsAnnualUrl)),
      firstValueFrom(this.httpService.get(incomeGrowthMetricsQuarterlyUrl)),
      firstValueFrom(this.httpService.get(incomeGrowthMetricsAnnualUrl)),
      firstValueFrom(this.httpService.get(profitGrowthMetricsQuarterlyUrl)),
      firstValueFrom(this.httpService.get(profitGrowthMetricsAnnualUrl)),
    ]);

    return {
      keyMetricsQuarterly: keyMetricsQuarterly.data,
      keyMetricsAnnual: keyMetricsAnnual.data,
      incomeGrowthMetricsQuarterly: incomeGrowthMetricsQuarterly.data,
      incomeGrowthMetricsAnnual: incomeGrowthMetricsAnnual.data,
      profitGrowthMetricsQuarterly: profitGrowthMetricsQuarterly.data,
      profitGrowthMetricsAnnual: profitGrowthMetricsAnnual.data,
    };
  }

  async saveMetrics(symbol: string) {
    const metrics = await this.fetchMetrics(symbol);
    const stock = await this.stocksService.getStock(symbol);

    const keyMetrics = [
      ...metrics.keyMetricsQuarterly,
      ...metrics.keyMetricsAnnual,
    ].map((metric) => ({
      ...metric,
      stock: (stock as StockDocument)._id,
    }));

    const incomeGrowthMetrics = [
      ...metrics.incomeGrowthMetricsQuarterly,
      ...metrics.incomeGrowthMetricsAnnual,
    ].map((metric) => ({
      ...metric,
      stock: (stock as StockDocument)._id,
    }));

    const profitGrowthMetrics = [
      ...metrics.profitGrowthMetricsQuarterly,
      ...metrics.profitGrowthMetricsAnnual,
    ].map((metric) => ({
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
