import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Types } from 'mongoose';

import { MetricsRepository, StocksRepository } from '../repositories';
import { StocksService } from './stocks.service';
import { StockDocument } from '../schemas/stock.schema';
import { PeriodType } from '../enums';
import {
  IncomeGrowthMetricDto,
  ProfitGrowthMetricDto,
  KeyMetricDto,
  CombinedMetricsDto,
} from '../dto';

@Injectable()
export class MetricsService {
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly stocksRepository: StocksRepository,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
  ) {}

  private async fetchMetrics(symbol: string) {
    const keyMetricsAnnualUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?apikey=${this.apiKey}`;
    const incomeGrowthMetricsAnnualUrl = `https://financialmodelingprep.com/api/v3/income-statement-growth/${symbol}?apikey=${this.apiKey}`;
    const profitGrowthMetricsAnnualUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement-growth/${symbol}?apikey=${this.apiKey}`;

    const keyMetricsQuarterlyUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?period=quarter&apikey=${this.apiKey}`;
    const incomeGrowthMetricsQuarterlyUrl = `https://financialmodelingprep.com/api/v3/income-statement-growth/${symbol}?period=quarter&apikey=${this.apiKey}`;
    const profitGrowthMetricsQuarterlyUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement-growth/${symbol}?period=quarter&apikey=${this.apiKey}`;

    const [
      keyMetricsAnnual,
      incomeGrowthMetricsAnnual,
      profitGrowthMetricsAnnual,
      keyMetricsQuarterly,
      incomeGrowthMetricsQuarterly,
      profitGrowthMetricsQuarterly,
    ] = await Promise.all([
      firstValueFrom(this.httpService.get(keyMetricsAnnualUrl)),
      firstValueFrom(this.httpService.get(incomeGrowthMetricsAnnualUrl)),
      firstValueFrom(this.httpService.get(profitGrowthMetricsAnnualUrl)),
      firstValueFrom(this.httpService.get(keyMetricsQuarterlyUrl)),
      firstValueFrom(this.httpService.get(incomeGrowthMetricsQuarterlyUrl)),
      firstValueFrom(this.httpService.get(profitGrowthMetricsQuarterlyUrl)),
    ]);

    return {
      keyMetricsAnnual: keyMetricsAnnual.data,
      incomeGrowthMetricsAnnual: incomeGrowthMetricsAnnual.data,
      profitGrowthMetricsAnnual: profitGrowthMetricsAnnual.data,
      keyMetricsQuarterly: keyMetricsQuarterly.data,
      incomeGrowthMetricsQuarterly: incomeGrowthMetricsQuarterly.data,
      profitGrowthMetricsQuarterly: profitGrowthMetricsQuarterly.data,
    };
  }

  public async saveMetrics(symbol: string) {
    const metrics = await this.fetchMetrics(symbol);
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;

    if (
      !metrics.keyMetricsAnnual ||
      !metrics.incomeGrowthMetricsAnnual ||
      !metrics.profitGrowthMetricsAnnual
    ) {
      console.error('Metrics data is missing:', metrics);
      throw new Error('Metrics data is incomplete.');
    }

    const lastAnnualKeyMetrics = metrics.keyMetricsAnnual.find(
      (metric) => metric.period === 'FY',
    );
    const lastAnnualIncomeGrowthMetrics =
      metrics.incomeGrowthMetricsAnnual.find(
        (metric) => metric.period === 'FY',
      );
    const lastAnnualProfitGrowthMetrics =
      metrics.profitGrowthMetricsAnnual.find(
        (metric) => metric.period === 'FY',
      );

    // Update the stock document with the last annual metrics
    const updatedStock = {
      lastAnnualKeyMetrics: lastAnnualKeyMetrics || null,
      lastAnnualIncomeGrowthMetrics: lastAnnualIncomeGrowthMetrics || null,
      lastAnnualProfitGrowthMetrics: lastAnnualProfitGrowthMetrics || null,
    };

    await this.stocksRepository.update(stock.symbol, updatedStock);

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

  public async getMetrics(
    identifier: string,
    { periodType }: { periodType: PeriodType },
  ) {
    // Find stock by identifier (could be either symbol or ID)
    const stock = (await this.stocksRepository.findByIdOrSymbol(
      identifier,
    )) as StockDocument;
    if (!stock) {
      throw new Error(`Stock with identifier ${identifier} not found`);
    }

    const keyMetrics = await this.metricsRepository.findKeyMetrics(
      stock.id,
      periodType,
    );
    const incomeGrowthMetrics =
      await this.metricsRepository.findIncomeGrowthMetrics(
        stock.id,
        periodType,
      );
    const profitGrowthMetrics =
      await this.metricsRepository.findProfitGrowthMetrics(
        stock.id,
        periodType,
      );

    return {
      keyMetrics: plainToClass(KeyMetricDto, keyMetrics, {
        excludeExtraneousValues: true,
      }),
      incomeGrowthMetrics: plainToClass(
        IncomeGrowthMetricDto,
        incomeGrowthMetrics,
        {
          excludeExtraneousValues: true,
        },
      ),
      profitGrowthMetrics: plainToClass(
        ProfitGrowthMetricDto,
        profitGrowthMetrics,
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  public async getCombinedData(
    symbol: string,
    periodType: PeriodType,
    properties: string[],
  ) {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const keyMetrics = await this.metricsRepository.findKeyMetrics(
      stock.id,
      periodType,
    );
    const incomeGrowthMetrics =
      await this.metricsRepository.findIncomeGrowthMetrics(
        stock.id,
        periodType,
      );
    const profitGrowthMetrics =
      await this.metricsRepository.findProfitGrowthMetrics(
        stock.id,
        periodType,
      );

    const combinedData: { [key: string]: any } = {};

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

  public async getGroupMetrics(
    symbol: string,
    periodType: PeriodType,
    limit: number = 5,
  ): Promise<CombinedMetricsDto[]> {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const keyMetrics = await this.metricsRepository.findKeyMetrics(
      stock.id,
      periodType,
      limit,
    );
    const incomeGrowthMetrics =
      await this.metricsRepository.findIncomeGrowthMetrics(
        stock.id,
        periodType,
        limit,
      );
    const profitGrowthMetrics =
      await this.metricsRepository.findProfitGrowthMetrics(
        stock.id,
        periodType,
        limit,
      );

    const filteredKeyMetrics = plainToClass(KeyMetricDto, keyMetrics, {
      excludeExtraneousValues: true,
    });

    const filteredIncomeGrowthMetrics = plainToClass(
      IncomeGrowthMetricDto,
      incomeGrowthMetrics,
      {
        excludeExtraneousValues: true,
      },
    );

    const filteredProfitGrowthMetrics = plainToClass(
      ProfitGrowthMetricDto,
      profitGrowthMetrics,
      {
        excludeExtraneousValues: true,
      },
    );

    const mergedMetrics = this.mergeMetrics(
      filteredKeyMetrics,
      filteredIncomeGrowthMetrics,
      filteredProfitGrowthMetrics,
    );

    return plainToClass(CombinedMetricsDto, mergedMetrics, {
      excludeExtraneousValues: true,
    }).slice(0, 10);
  }

  private mergeMetrics(
    keyMetrics: KeyMetricDto[],
    incomeGrowthMetrics: IncomeGrowthMetricDto[],
    profitGrowthMetrics: ProfitGrowthMetricDto[],
  ): any[] {
    const merged = {};

    const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

    const addToMerged = (array) => {
      array.forEach((item) => {
        const key = `${item.date}-${item.period}`;
        if (merged[key]) {
          merged[key] = mergeObjects(merged[key], item);
        } else {
          merged[key] = { ...item };
        }
      });
    };

    addToMerged(keyMetrics);
    addToMerged(incomeGrowthMetrics);
    addToMerged(profitGrowthMetrics);

    return Object.values(merged);
  }

  public async getIncomeGrowthMetrics(
    symbol: string,
    periodType: PeriodType,
    page: number,
    limit: number,
  ) {
    const stock = await this.stocksService.getStock(symbol);
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }
    const stockId = (stock as StockDocument)._id as Types.ObjectId;
    const metrics = await this.metricsRepository.findIncomeGrowthMetrics(
      stockId,
      periodType,
      limit,
    );

    return {
      metrics: metrics.slice((page - 1) * limit, page * limit),
      total: metrics.length,
    };
  }

  public async getKeyMetrics(
    symbol: string,
    periodType: PeriodType,
    page: number,
    limit: number,
  ) {
    const stock = await this.stocksService.getStock(symbol);
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }
    const stockId = (stock as StockDocument)._id as Types.ObjectId;
    const metrics = await this.metricsRepository.findKeyMetrics(
      stockId,
      periodType,
      limit,
    );

    return {
      metrics: metrics.slice((page - 1) * limit, page * limit),
      total: metrics.length,
    };
  }

  public async getProfitGrowthMetrics(
    symbol: string,
    periodType: PeriodType,
    page: number,
    limit: number,
  ) {
    const stock = await this.stocksService.getStock(symbol);
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const stockId = (stock as StockDocument)._id as Types.ObjectId;
    const metrics = await this.metricsRepository.findProfitGrowthMetrics(
      stockId,
      periodType,
      limit,
    );

    return {
      metrics: metrics.slice((page - 1) * limit, page * limit),
      total: metrics.length,
    };
  }
}
