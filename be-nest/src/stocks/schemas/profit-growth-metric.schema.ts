import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfitGrowthDocument = ProfitGrowthMetrics & Document;

@Schema({ timestamps: true })
export class ProfitGrowthMetrics {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  calendarYear: string;

  @Prop({ required: true })
  period: string;

  @Prop()
  growthNetIncome: number;

  @Prop()
  growthDepreciationAndAmortization: number;

  @Prop()
  growthDeferredIncomeTax: number;

  @Prop()
  growthStockBasedCompensation: number;

  @Prop()
  growthChangeInWorkingCapital: number;

  @Prop()
  growthAccountsReceivables: number;

  @Prop()
  growthInventory: number;

  @Prop()
  growthAccountsPayables: number;

  @Prop()
  growthOtherWorkingCapital: number;

  @Prop()
  growthOtherNonCashItems: number;

  @Prop()
  growthNetCashProvidedByOperatingActivities: number;

  @Prop()
  growthInvestmentsInPropertyPlantAndEquipment: number;

  @Prop()
  growthAcquisitionsNet: number;

  @Prop()
  growthPurchasesOfInvestments: number;

  @Prop()
  growthSalesMaturitiesOfInvestments: number;

  @Prop()
  growthOtherInvestingActivities: number;

  @Prop()
  growthNetCashUsedForInvestingActivities: number;

  @Prop()
  growthDebtRepayment: number;

  @Prop()
  growthCommonStockIssued: number;

  @Prop()
  growthCommonStockRepurchased: number;

  @Prop()
  growthDividendsPaid: number;

  @Prop()
  growthOtherFinancingActivities: number;

  @Prop()
  growthNetCashUsedProvidedByFinancingActivities: number;

  @Prop()
  growthEffectOfForexChangesOnCash: number;

  @Prop()
  growthNetChangeInCash: number;

  @Prop()
  growthCashAtEndOfPeriod: number;

  @Prop()
  growthCashAtBeginningOfPeriod: number;

  @Prop()
  growthOperatingCashFlow: number;

  @Prop()
  growthCapitalExpenditure: number;

  @Prop()
  growthFreeCashFlow: number;
}

export const ProfitGrowthMetricsSchema =
  SchemaFactory.createForClass(ProfitGrowthMetrics);
