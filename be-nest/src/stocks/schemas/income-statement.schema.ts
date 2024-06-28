import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IncomeStatementDocument = IncomeStatement & Document;

@Schema({ timestamps: true })
export class IncomeStatement {
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
  revenue: number;

  @Prop({ type: Number })
  costOfRevenue: number;

  @Prop({ type: Number })
  grossProfit: number;

  @Prop({ type: Number })
  grossProfitRatio: number;

  @Prop({ type: Number })
  researchAndDevelopmentExpenses: number;

  @Prop({ type: Number })
  generalAndAdministrativeExpenses: number;

  @Prop({ type: Number })
  sellingAndMarketingExpenses: number;

  @Prop({ type: Number })
  sellingGeneralAndAdministrativeExpenses: number;

  @Prop({ type: Number })
  otherExpenses: number;

  @Prop({ type: Number })
  operatingExpenses: number;

  @Prop({ type: Number })
  costAndExpenses: number;

  @Prop({ type: Number })
  interestIncome: number;

  @Prop({ type: Number })
  interestExpense: number;

  @Prop({ type: Number })
  depreciationAndAmortization: number;

  @Prop({ type: Number })
  ebitda: number;

  @Prop({ type: Number })
  ebitdaratio: number;

  @Prop({ type: Number })
  operatingIncome: number;

  @Prop({ type: Number })
  operatingIncomeRatio: number;

  @Prop({ type: Number })
  totalOtherIncomeExpensesNet: number;

  @Prop({ type: Number })
  incomeBeforeTax: number;

  @Prop({ type: Number })
  incomeBeforeTaxRatio: number;

  @Prop({ type: Number })
  incomeTaxExpense: number;

  @Prop({ type: Number })
  netIncome: number;

  @Prop({ type: Number })
  netIncomeRatio: number;

  @Prop({ type: Number })
  eps: number;

  @Prop({ type: Number })
  epsdiluted: number;

  @Prop({ type: Number })
  weightedAverageShsOut: number;

  @Prop({ type: Number })
  weightedAverageShsOutDil: number;

  @Prop({ type: String })
  link: string;

  @Prop({ type: String })
  finalLink: string;
}

export const IncomeStatementSchema =
  SchemaFactory.createForClass(IncomeStatement);
