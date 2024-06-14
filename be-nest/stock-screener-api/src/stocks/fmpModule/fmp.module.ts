import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { AnalystRatingsService } from './services/analyst-ratings.service';

import {
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
} from './schemas';

import { StatementsService } from './services/statements.service';
import { MetricsService } from './services/metrics.service';
import { OutlookService } from './services/outlook.service';
import { OutlookRepository } from './repositories/outlook.repository';
import { FmpController } from './fmp.controller';
import { StatementsRepository } from './repositories/statements.repository';
import { MetricsRepository } from './repositories/metrics.repository';
import { AnalystRatingsRepository } from './repositories/analyst-ratings.repository';
import { StocksModule } from '../stocks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
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
    forwardRef(() => StocksModule),
  ],
  providers: [
    StatementsService,
    StatementsRepository,
    MetricsService,
    MetricsRepository,
    AnalystRatingsService,
    AnalystRatingsRepository,
    OutlookService,
    OutlookRepository,
  ],
  controllers: [FmpController],
  exports: [MongooseModule, MetricsRepository],
})
export class FmpModule {}
