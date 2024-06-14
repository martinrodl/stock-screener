// src/stocks/counted/schemas/actual-values.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActualValuesDocument = ActualValues & Document;

@Schema({ timestamps: true })
export class ActualValues {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop({ type: String })
  date: string;

  @Prop({ type: Number })
  capeRatio: number;

  @Prop({ type: Number })
  intrinsicValueZeroGrowth: number;

  @Prop({ type: Number })
  intrinsicValueAverageGrowth5y: number;

  @Prop({ type: Number })
  intrinsicValueLastYearGrowth: number;

  @Prop({ type: Number })
  peterlynchValue: number;

  @Prop({ type: Number })
  sharesOutstanding: number;

  @Prop({ type: Number })
  sharesOutstanding5y: number;

  @Prop({ type: Number })
  roe5y: number;

  @Prop({ type: Number })
  roic5y: number;

  @Prop({ type: Number })
  averageProfitGrowth5y: number;

  @Prop({ type: Number })
  averageDividendGrowth5y: number;

  @Prop({ type: Number })
  averageNetIncomeGrowth5y: number;

  @Prop({ type: Number })
  averageProfitMargin5y: number;

  @Prop({ type: Number })
  debtPerShare: number;

  @Prop({ type: Number })
  dividendYield5y: number;

  @Prop({ type: Number })
  dividendPayoutRatio5y: number;

  @Prop({ type: Number })
  buybackYield: number;

  @Prop({ type: [String] })
  similarCompanies: string[];

  @Prop({ type: Number })
  averagePESimilarCompanies: number;

  @Prop({ type: Number })
  averagePE5y: number;

  @Prop({ type: Number })
  freeCashFlow: number;
}

export const ActualValuesSchema = SchemaFactory.createForClass(ActualValues);
