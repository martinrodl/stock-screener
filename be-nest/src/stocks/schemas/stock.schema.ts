import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // Add Types import
import { ApiProperty } from '@nestjs/swagger';
import { KeyMetrics, KeyMetricsSchema } from './key-metric.schema';

import {
  ProfitGrowthMetrics,
  ProfitGrowthMetricsSchema,
} from './profit-growth-metric.schema';
import { ActualValues, ActualValuesSchema } from './actual-values.schema';
import {
  IncomeStatement,
  IncomeStatementSchema,
} from './income-statement.schema';
import {
  BalanceSheetStatement,
  BalanceSheetStatementSchema,
} from './balance-sheet-statement.schema';
import {
  CashFlowStatement,
  CashFlowStatementSchema,
} from './cash-flow-statement.schema';

import {
  IncomeGrowthMetrics,
  IncomeGrowthMetricSchema,
} from './income-growth-metric.schema';

import { Profile, ProfileSchema } from './profile.schema';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @ApiProperty({
    description: 'The symbol of the stock',
    uniqueItems: true,
    example: 'AAPL',
  })
  @Prop({ required: true, unique: true })
  symbol: string;

  @ApiProperty({ description: 'The name of the stock', example: 'Apple Inc.' })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'The exchange where the stock is listed',
    example: 'NASDAQ',
  })
  @Prop()
  exchange: string;

  @ApiProperty({
    description: 'The price-to-earnings ratio of the stock',
    example: 35.67,
  })
  @Prop()
  pe: number;

  @ApiProperty({
    description: 'The current price of the stock',
    example: 145.09,
  })
  @Prop()
  price: number;

  @ApiProperty({
    description: 'The market capitalization of the stock',
    example: 2400000000000,
  })
  @Prop()
  marketCap: number;

  @ApiProperty({
    description: 'The country where the stock is based',
    example: 'US',
  })
  @Prop()
  country: string;

  @ApiProperty({
    description: 'The sector of the stock',
    example: 'Technology',
  })
  @Prop()
  sector: string;

  @ApiProperty({
    description: 'The industry of the stock',
    example: 'Consumer Electronics',
  })
  @Prop()
  industry: string;

  @ApiProperty({
    description:
      'The last annual income growth metrics associated with the stock',
    type: IncomeGrowthMetrics,
  })
  @Prop({ type: IncomeGrowthMetricSchema })
  lastAnnualIncomeGrowthMetrics: IncomeGrowthMetrics;

  @ApiProperty({
    description:
      'The last annual profit growth metrics associated with the stock',
    type: ProfitGrowthMetrics,
  })
  @Prop({ type: ProfitGrowthMetricsSchema })
  lastAnnualProfitGrowthMetrics: ProfitGrowthMetrics;

  @ApiProperty({
    description: 'The last key metrics associated with the stock',
    type: KeyMetrics,
  })
  @Prop({ type: KeyMetricsSchema })
  lastAnnualKeyMetrics: KeyMetrics;

  @ApiProperty({
    description:
      'The last annual balance sheet statement associated with the stock',
    type: BalanceSheetStatement,
  })
  @Prop({ type: BalanceSheetStatementSchema })
  lastAnnualBalanceSheetStatement: BalanceSheetStatement;

  @ApiProperty({
    description:
      'The last annual cash flow statement associated with the stock',
    type: CashFlowStatement,
  })
  @Prop({ type: CashFlowStatementSchema })
  lastAnnualCashFlowStatement: CashFlowStatement;

  @ApiProperty({
    description: 'The last annual income statement associated with the stock',
    type: IncomeStatement,
  })
  @Prop({ type: IncomeStatementSchema })
  lastAnnualIncomeStatement: IncomeStatement;

  @ApiProperty({
    description: 'The actual values associated with the stock',
    type: ActualValues,
  })
  @Prop({ type: ActualValuesSchema }) // Embed the ActualValues schema directly
  actualValues: ActualValues;

  @ApiProperty({
    description: 'The profile values associated with the stock',
    type: Profile,
  })
  @Prop({ type: ProfileSchema })
  profile: Profile;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
StockSchema.index({ symbol: 1 }, { unique: true });
