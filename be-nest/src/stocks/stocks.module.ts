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
  Filter,
  FilterSchema,
  ETF,
  ETFSchema,
} from './schemas';
import {
  AnalystRatingsService,
  CronService,
  MetricsService,
  CountedService,
  OutlookService,
  StatementsService,
  StocksService,
  FilterService,
  ETFService,
} from './services';
import {
  FmpController,
  StocksController,
  FilterController,
  TasksController,
  ETFController,
} from './controllers';
import {
  StatementsRepository,
  MetricsRepository,
  AnalystRatingsRepository,
  OutlookRepository,
  StocksRepository,
  FilterRepository,
  ETFRepository,
} from './repositories';
import { OtherModule } from '../other/other.module';

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
      { name: Filter.name, schema: FilterSchema },
      { name: ETF.name, schema: ETFSchema },
    ]),
    HttpModule,
    OtherModule,
  ],
  controllers: [
    StocksController,
    FmpController,
    FilterController,
    TasksController,
    ETFController,
  ],
  providers: [
    CronService,
    StocksService,
    MetricsService,
    CountedService,
    OutlookService,
    StatementsService,
    AnalystRatingsService,
    MetricsRepository,
    StatementsRepository,
    AnalystRatingsRepository,
    OutlookRepository,
    StocksRepository,
    FilterRepository,
    FilterService,
    ETFRepository,
    ETFService,
  ],
})
export class StocksModule {}
