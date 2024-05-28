import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BalanceSheetStatementDocument = BalanceSheetStatement & Document;

@Schema({ timestamps: true })
export class BalanceSheetStatement {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  reportedCurrency: string;

  @Prop({ type: String })
  cik: string;

  @Prop({ type: Date })
  fillingDate: Date;

  @Prop({ type: Date })
  acceptedDate: Date;

  @Prop({ type: String })
  calendarYear: string;

  @Prop({ type: String })
  period: string;

  @Prop({ type: Number })
  cashAndCashEquivalents: number;

  @Prop({ type: Number })
  shortTermInvestments: number;

  @Prop({ type: Number })
  cashAndShortTermInvestments: number;

  @Prop({ type: Number })
  netReceivables: number;

  @Prop({ type: Number })
  inventory: number;

  @Prop({ type: Number })
  otherCurrentAssets: number;

  @Prop({ type: Number })
  totalCurrentAssets: number;

  @Prop({ type: Number })
  propertyPlantEquipmentNet: number;

  @Prop({ type: Number })
  goodwill: number;

  @Prop({ type: Number })
  intangibleAssets: number;

  @Prop({ type: Number })
  goodwillAndIntangibleAssets: number;

  @Prop({ type: Number })
  longTermInvestments: number;

  @Prop({ type: Number })
  taxAssets: number;

  @Prop({ type: Number })
  otherNonCurrentAssets: number;

  @Prop({ type: Number })
  totalNonCurrentAssets: number;

  @Prop({ type: Number })
  otherAssets: number;

  @Prop({ type: Number })
  totalAssets: number;

  @Prop({ type: Number })
  accountPayables: number;

  @Prop({ type: Number })
  shortTermDebt: number;

  @Prop({ type: Number })
  taxPayables: number;

  @Prop({ type: Number })
  deferredRevenue: number;

  @Prop({ type: Number })
  otherCurrentLiabilities: number;

  @Prop({ type: Number })
  totalCurrentLiabilities: number;

  @Prop({ type: Number })
  longTermDebt: number;

  @Prop({ type: Number })
  deferredRevenueNonCurrent: number;

  @Prop({ type: Number })
  deferredTaxLiabilitiesNonCurrent: number;

  @Prop({ type: Number })
  otherNonCurrentLiabilities: number;

  @Prop({ type: Number })
  totalNonCurrentLiabilities: number;

  @Prop({ type: Number })
  otherLiabilities: number;

  @Prop({ type: Number })
  capitalLeaseObligations: number;

  @Prop({ type: Number })
  totalLiabilities: number;

  @Prop({ type: Number })
  preferredStock: number;

  @Prop({ type: Number })
  commonStock: number;

  @Prop({ type: Number })
  retainedEarnings: number;

  @Prop({ type: Number })
  accumulatedOtherComprehensiveIncomeLoss: number;

  @Prop({ type: Number })
  othertotalStockholdersEquity: number;

  @Prop({ type: Number })
  totalStockholdersEquity: number;

  @Prop({ type: Number })
  totalEquity: number;

  @Prop({ type: Number })
  totalLiabilitiesAndStockholdersEquity: number;

  @Prop({ type: Number })
  minorityInterest: number;

  @Prop({ type: Number })
  totalLiabilitiesAndTotalEquity: number;

  @Prop({ type: Number })
  totalInvestments: number;

  @Prop({ type: Number })
  totalDebt: number;

  @Prop({ type: Number })
  netDebt: number;

  @Prop({ type: String })
  link: string;

  @Prop({ type: String })
  finalLink: string;
}

export const BalanceSheetStatementSchema = SchemaFactory.createForClass(
  BalanceSheetStatement,
);
