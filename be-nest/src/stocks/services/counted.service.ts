import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Types } from 'mongoose';

import { StocksService } from './stocks.service';
import {
  MetricsRepository,
  StatementsRepository,
  StocksRepository,
} from '../repositories';
import { StockDocument } from '../schemas';
import { OtherRepository } from '../../other/repositories/other.repository';
import { PeriodType } from '../enums';

@Injectable()
export class CountedService {
  private readonly apiKey = process.env.API_KEY;

  constructor(
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
    private readonly metricsRepository: MetricsRepository,
    private readonly statementsRepository: StatementsRepository,
    private readonly stockRepository: StocksRepository,
    private readonly otherRepository: OtherRepository,
    private readonly httpService: HttpService,
  ) {}

  async updateStockValues(
    symbol: string,
    periodType: PeriodType = PeriodType.ANNUAL,
  ): Promise<void> {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }

    const updatedValues = await this.fetchAndCalculateStockValues(
      stock,
      periodType,
    );

    // Update the stock document with the new actual values
    await this.stockRepository.updateActualValues(
      stock._id.toString(),
      updatedValues,
    );
  }

  private async fetchAndCalculateStockValues(
    stock: StockDocument,
    periodType: PeriodType,
  ) {
    const stockId = stock._id;

    const incomeStatements =
      await this.statementsRepository.findIncomeStatements(
        stock.id,
        periodType,
      );

    const cashFlowStatements =
      await this.statementsRepository.findCashFlowStatements(
        stock.id,
        periodType,
      );

    const growthMetrics = await this.metricsRepository.findIncomeGrowthMetrics(
      stock.id,
      periodType,
    );

    const keyMetrics = await this.metricsRepository.findKeyMetrics(
      stock.id,
      periodType,
    );

    if (
      !incomeStatements.length ||
      !cashFlowStatements.length ||
      !growthMetrics.length ||
      !keyMetrics.length
    ) {
      console.error(
        `Data missing: incomeStatements: ${incomeStatements.length}, cashFlowStatements: ${cashFlowStatements.length}, growthMetrics: ${growthMetrics.length}, keyMetrics: ${keyMetrics.length}`,
      );
      throw new NotFoundException(
        `Financial data not found for stock with id ${stockId}`,
      );
    }

    const latestIncomeStatement = incomeStatements[0];
    const latestCashFlowStatement = cashFlowStatements[0];
    const latestGrowthMetric = growthMetrics[0];
    const latestKeyMetric = keyMetrics[0];

    const outstandingShares = latestIncomeStatement.weightedAverageShsOut;
    const netIncome = latestIncomeStatement.netIncome;
    const eps = netIncome / outstandingShares;

    const averageGrowth =
      growthMetrics
        .slice(0, 5)
        .reduce((sum, metric) => sum + metric.growthRevenue, 0) / 5;
    const lastYearGrowth = latestGrowthMetric.growthRevenue;

    // Fetch current yield from OtherRepository
    const other = await this.otherRepository.findLatest();
    const currentYield = other ? other.currentYield : 4.4; // Use default value if not found

    const intrinsicValueZeroGrowth = (eps * (8.5 + 2 * 0) * 4.4) / currentYield;
    const intrinsicValueAverageGrowth5y =
      (eps * (8.5 + 2 * averageGrowth) * 4.4) / currentYield;
    const intrinsicValueLastYearGrowth =
      (eps * (8.5 + 2 * lastYearGrowth) * 4.4) / currentYield;

    const averagePE5y =
      keyMetrics
        .slice(-5)
        .reduce((sum, metric) => sum + (metric.peRatio || 0), 0) /
      keyMetrics.length;

    // Peter Lynch Fair Value Calculation
    const peForNoGrowthCompany = 15; // This can be adjusted
    const fairValue = eps * (peForNoGrowthCompany + averageGrowth);

    // Calculate CAPE Ratio
    const averageEarnings =
      incomeStatements
        .slice(0, 10)
        .reduce((sum, statement) => sum + statement.netIncome, 0) / 10;
    const currentPrice = stock.price; // Use current price from stock schema
    const capeRatio = currentPrice / averageEarnings;

    // Calculate Free Cash Flow
    const freeCashFlow =
      latestCashFlowStatement.netCashProvidedByOperatingActivities -
      latestCashFlowStatement.capitalExpenditure;

    // Calculate Similar Companies and PE
    const { similarCompanies, averagePE: averagePESimilarCompanies } =
      await this.calculateSimilarCompanies(stock.symbol);

    const buybackYield =
      latestCashFlowStatement.commonStockRepurchased /
      latestKeyMetric.marketCap;

    console.log(keyMetrics.slice(5));

    return {
      stock: stockId, // Include the stock field in the values
      date: new Date().toISOString(),
      capeRatio,
      averagePE5y,
      intrinsicValueZeroGrowth,
      intrinsicValueAverageGrowth5y,
      intrinsicValueLastYearGrowth,
      peterlynchValue: fairValue,
      sharesOutstanding: outstandingShares,
      sharesOutstanding5y:
        incomeStatements
          .slice(-5)
          .reduce(
            (sum, metric) => sum + (metric.weightedAverageShsOut || 0),
            0,
          ) / 5,
      roe5y:
        keyMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.roe || 0), 0) / 5,
      roic5y:
        keyMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.roic || 0), 0) / 5,
      averageProfitGrowth5y:
        growthMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.growthNetIncome || 0), 0) / 5,
      averageDividendGrowth5y:
        growthMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.growthNetIncome || 0), 0) / 5,

      averageNetIncomeGrowth5y:
        growthMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.growthNetIncome || 0), 0) / 5,
      averageProfitMargin5y:
        incomeStatements
          .slice(-5)
          .reduce(
            (sum, statement) => sum + (statement.netIncomeRatio || 0),
            0,
          ) / 5,
      debtPerShare: latestKeyMetric.interestDebtPerShare,
      dividendYield5y:
        keyMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.dividendYield || 0), 0) / 5,
      dividendPayoutRatio5y:
        keyMetrics
          .slice(-5)
          .reduce((sum, metric) => sum + (metric.payoutRatio || 0), 0) / 5,
      buybackYield: buybackYield,
      similarCompanies,
      averagePESimilarCompanies,
      freeCashFlow,
    };
  }

  private async calculateSimilarCompanies(symbol: string) {
    const peerListResponse = await firstValueFrom(
      this.httpService.get(
        `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${symbol}&apikey=${this.apiKey}`,
      ),
    );

    const peersList = peerListResponse.data[0]?.peersList || [];

    let sumPE = 0;
    let validCount = 0;
    for (const peer of peersList) {
      try {
        const stockQuoteResponse = await firstValueFrom(
          this.httpService.get(
            `https://financialmodelingprep.com/api/v3/quote/${peer}?apikey=${this.apiKey}`,
          ),
        );
        const stockQuote = stockQuoteResponse.data[0];
        if (stockQuote && typeof stockQuote.pe === 'number') {
          sumPE += stockQuote.pe;
          validCount++;
        }
      } catch (error) {
        console.error(`Error fetching stock quote for ${peer}:`, error);
      }
    }

    const averagePE = sumPE / validCount;

    return {
      similarCompanies: peersList,
      averagePE,
    };
  }
}
