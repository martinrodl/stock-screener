// src/schemas/inside-trades.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InsideTradesDocument = InsideTrades & Document;

@Schema({ timestamps: true })
export class InsideTrades {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  filingDate: string;

  @Prop()
  transactionDate: string;

  @Prop()
  reportingCik: string;

  @Prop()
  transactionType: string;

  @Prop()
  securitiesOwned: number;

  @Prop()
  companyCik: string;

  @Prop()
  reportingName: string;

  @Prop()
  typeOfOwner: string;

  @Prop()
  acquistionOrDisposition: string;

  @Prop()
  formType: string;

  @Prop()
  securitiesTransacted: number;

  @Prop()
  price: number;

  @Prop()
  securityName: string;

  @Prop()
  link: string;
}

export const InsideTradesSchema = SchemaFactory.createForClass(InsideTrades);
