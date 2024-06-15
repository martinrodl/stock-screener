import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IncomeGrowthMetricDocument = IncomeGrowthMetrics & Document;

@Schema({ timestamps: true })
export class IncomeGrowthMetrics {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  calendarYear: string;

  @Prop({ required: true })
  period: string;

  @Prop()
  growthRevenue: number;

  @Prop()
  growthCostOfRevenue: number;

  @Prop()
  growthGrossProfit: number;

  @Prop()
  growthGrossProfitRatio: number;

  @Prop()
  growthResearchAndDevelopmentExpenses: number;

  @Prop()
  growthGeneralAndAdministrativeExpenses: number;

  @Prop()
  growthSellingAndMarketingExpenses: number;

  @Prop()
  growthOtherExpenses: number;

  @Prop()
  growthOperatingExpenses: number;

  @Prop()
  growthCostAndExpenses: number;

  @Prop()
  growthInterestExpense: number;

  @Prop()
  growthDepreciationAndAmortization: number;

  @Prop()
  growthEBITDA: number;

  @Prop()
  growthEBITDARatio: number;

  @Prop()
  growthOperatingIncome: number;

  @Prop()
  growthOperatingIncomeRatio: number;

  @Prop()
  growthTotalOtherIncomeExpensesNet: number;

  @Prop()
  growthIncomeBeforeTax: number;

  @Prop()
  growthIncomeBeforeTaxRatio: number;

  @Prop()
  growthIncomeTaxExpense: number;

  @Prop()
  growthNetIncome: number;

  @Prop()
  growthNetIncomeRatio: number;

  @Prop()
  growthEPS: number;

  @Prop()
  growthEPSDiluted: number;

  @Prop()
  growthWeightedAverageShsOut: number;

  @Prop()
  growthWeightedAverageShsOutDil: number;
}

export const IncomeGrowthMetricSchema =
  SchemaFactory.createForClass(IncomeGrowthMetrics);
