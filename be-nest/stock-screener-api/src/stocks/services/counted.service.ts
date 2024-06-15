import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Types } from 'mongoose';

import { StocksService } from '../services';
import {
  MetricsRepository,
  StatementsRepository,
  ActualValuesRepository,
} from '../repositories';
import { StockDocument } from '../schemas';

@Injectable()
export class CountedService {
  private readonly apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

  constructor(
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
    private readonly metricsRepository: MetricsRepository,
    private readonly statementsRepository: StatementsRepository,
    private readonly actualValuesRepository: ActualValuesRepository,
    private readonly httpService: HttpService,
  ) {}

  async updateStockValues(
    symbol: string,
    periodType: 'annual' | 'quarter' = 'annual',
  ): Promise<void> {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }

    const updatedValues = await this.fetchAndCalculateStockValues(
      stock,
      periodType,
    );

    await this.actualValuesRepository.updateValues(
      stock._id.toString(),
      updatedValues, // Ensure the stock field is of type ObjectId
    );
  }

  private async fetchAndCalculateStockValues(
    stock: StockDocument,
    periodType: 'annual' | 'quarter',
  ) {
    const stockId = stock._id;
    const filter = {
      stock: stockId,
      period:
        periodType === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] },
    };

    const incomeStatements =
      await this.statementsRepository.findIncomeStatements(filter);
    const cashFlowStatements =
      await this.statementsRepository.findCashFlowStatements(filter);
    const growthMetrics =
      await this.metricsRepository.findIncomeGrowthMetrics(filter);
    const keyMetrics = await this.metricsRepository.findKeyMetrics(filter);

    if (
      !incomeStatements.length ||
      !cashFlowStatements.length ||
      !growthMetrics.length ||
      !keyMetrics.length
    ) {
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

    const intrinsicValueZeroGrowth =
      (eps * (7.5 + 2 * 0 * 100) * 4.4) / (latestKeyMetric.earningsYield * 100);
    const intrinsicValueAverageGrowth5y =
      (eps * (8.5 + 2 * averageGrowth * 100) * 4.4) /
      (latestKeyMetric.earningsYield * 100);
    const intrinsicValueLastYearGrowth =
      (eps * (8.5 + 2 * lastYearGrowth * 100) * 4.4) /
      (latestKeyMetric.earningsYield * 100);

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

    return {
      stock: stockId as unknown as Types.ObjectId, // Ensure stockId is of type ObjectId
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
