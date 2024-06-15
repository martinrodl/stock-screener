import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import {
  Stock,
  StockSchema,
  BalanceSheetStatement,
  BalanceSheetStatementSchema,
  CashFlowStatement,
  CashFlowStatementSchema,
  IncomeStatement,
  IncomeStatementSchema,
  IncomeGrowthMetrics,
  IncomeGrowthMetricSchema,
  ProfitGrowthMetrics,
  ProfitGrowthMetricsSchema,
  KeyMetrics,
  KeyMetricsSchema,
  AnalystRatings,
  AnalystRatingsSchema,
  AnalystRatingsDetailedSchema,
  AnalystRatingsDetailed,
  InsideTradesSchema,
  InsideTrades,
  KeyExecutivesSchema,
  KeyExecutives,
  SplitsHistorySchema,
  SplitsHistory,
  StockDividendSchema,
  StockDividend,
  StockNewsSchema,
  StockNews,
  ProfileSchema,
  Profile,
  ActualValuesSchema,
  ActualValues,
} from './schemas';
import {
  AnalystRatingsService,
  MetricsService,
  CountedService,
  OutlookService,
  StatementsService,
  StocksService,
} from './services';
import {
  FmpController,
  CountedController,
  StocksController,
} from './controllers';
import {
  StatementsRepository,
  MetricsRepository,
  AnalystRatingsRepository,
  ActualValuesRepository,
  OutlookRepository,
  StocksRepository,
} from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stock.name, schema: StockSchema },
      { name: ActualValues.name, schema: ActualValuesSchema },
      { name: BalanceSheetStatement.name, schema: BalanceSheetStatementSchema },
      { name: CashFlowStatement.name, schema: CashFlowStatementSchema },
      { name: IncomeStatement.name, schema: IncomeStatementSchema },
      { name: IncomeGrowthMetrics.name, schema: IncomeGrowthMetricSchema },
      { name: ProfitGrowthMetrics.name, schema: ProfitGrowthMetricsSchema },
      { name: KeyMetrics.name, schema: KeyMetricsSchema },
      { name: AnalystRatings.name, schema: AnalystRatingsSchema },
      {
        name: AnalystRatingsDetailed.name,
        schema: AnalystRatingsDetailedSchema,
      },
      { name: InsideTrades.name, schema: InsideTradesSchema },
      { name: KeyExecutives.name, schema: KeyExecutivesSchema },
      { name: SplitsHistory.name, schema: SplitsHistorySchema },
      { name: StockDividend.name, schema: StockDividendSchema },
      { name: StockNews.name, schema: StockNewsSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
    HttpModule,
  ],
  controllers: [StocksController, FmpController, CountedController],
  providers: [
    StocksService,
    MetricsService,
    CountedService,
    OutlookService,
    StatementsService,
    AnalystRatingsService,
    MetricsRepository,
    StatementsRepository,
    AnalystRatingsRepository,
    ActualValuesRepository,
    OutlookRepository,
    StocksRepository,
  ],
})
export class StocksModule {}
