import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KeyMetricsDocument = KeyMetrics & Document;

@Schema({ timestamps: true })
export class KeyMetrics {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  calendarYear: string;

  @Prop({ required: true })
  period: string;

  @Prop()
  revenuePerShare: number;

  @Prop()
  netIncomePerShare: number;

  @Prop()
  operatingCashFlowPerShare: number;

  @Prop()
  freeCashFlowPerShare: number;

  @Prop()
  cashPerShare: number;

  @Prop()
  bookValuePerShare: number;

  @Prop()
  tangibleBookValuePerShare: number;

  @Prop()
  shareholdersEquityPerShare: number;

  @Prop()
  interestDebtPerShare: number;

  @Prop()
  marketCap: number;

  @Prop()
  enterpriseValue: number;

  @Prop()
  peRatio: number;

  @Prop()
  priceToSalesRatio: number;

  @Prop()
  pocfratio: number;

  @Prop()
  pfcfRatio: number;

  @Prop()
  pbRatio: number;

  @Prop()
  ptbRatio: number;

  @Prop()
  evToSales: number;

  @Prop()
  enterpriseValueOverEBITDA: number;

  @Prop()
  evToOperatingCashFlow: number;

  @Prop()
  evToFreeCashFlow: number;

  @Prop()
  earningsYield: number;

  @Prop()
  freeCashFlowYield: number;

  @Prop()
  debtToEquity: number;

  @Prop()
  debtToAssets: number;

  @Prop()
  netDebtToEBITDA: number;

  @Prop()
  currentRatio: number;

  @Prop()
  interestCoverage: number;

  @Prop()
  incomeQuality: number;

  @Prop()
  dividendYield: number;

  @Prop()
  payoutRatio: number;

  @Prop()
  salesGeneralAndAdministrativeToRevenue: number;

  @Prop()
  researchAndDdevelopementToRevenue: number;

  @Prop()
  intangiblesToTotalAssets: number;

  @Prop()
  capexToOperatingCashFlow: number;

  @Prop()
  capexToRevenue: number;

  @Prop()
  capexToDepreciation: number;

  @Prop()
  stockBasedCompensationToRevenue: number;

  @Prop()
  grahamNumber: number;

  @Prop()
  roic: number;

  @Prop()
  returnOnTangibleAssets: number;

  @Prop()
  grahamNetNet: number;

  @Prop()
  workingCapital: number;

  @Prop()
  tangibleAssetValue: number;

  @Prop()
  netCurrentAssetValue: number;

  @Prop()
  investedCapital: number;

  @Prop()
  averageReceivables: number;

  @Prop()
  averagePayables: number;

  @Prop()
  averageInventory: number;

  @Prop()
  daysSalesOutstanding: number;

  @Prop()
  daysPayablesOutstanding: number;

  @Prop()
  daysOfInventoryOnHand: number;

  @Prop()
  receivablesTurnover: number;

  @Prop()
  payablesTurnover: number;

  @Prop()
  inventoryTurnover: number;

  @Prop()
  roe: number;

  @Prop()
  capexPerShare: number;
}

export const KeyMetricsSchema = SchemaFactory.createForClass(KeyMetrics);
