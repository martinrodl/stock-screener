import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {
  BalanceSheetStatement,
  BalanceSheetStatementSchema,
} from './schemas/balance-sheet-statement.schema';
import {
  CashFlowStatement,
  CashFlowStatementSchema,
} from './schemas/cash-flow-statement.schema';
import {
  IncomeStatement,
  IncomeStatementSchema,
} from './schemas/income-statement.schema';
import {
  IncomeGrowthMetrics,
  IncomeGrowthMetricSchema,
} from './schemas/income-growth-metric.schema';
import { StatementsService } from './services/statements.service';
import { FmpController } from './fmp.controller';
import { StatementsRepository } from './repositories/statements.repository';
import { StocksModule } from '../stocks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceSheetStatement.name, schema: BalanceSheetStatementSchema },
      { name: CashFlowStatement.name, schema: CashFlowStatementSchema },
      { name: IncomeStatement.name, schema: IncomeStatementSchema },
      { name: IncomeGrowthMetrics.name, schema: IncomeGrowthMetricSchema },
    ]),
    HttpModule,
    forwardRef(() => StocksModule),
  ],
  providers: [StatementsService, StatementsRepository],
  controllers: [FmpController],
  exports: [MongooseModule],
})
export class FmpModule {}
