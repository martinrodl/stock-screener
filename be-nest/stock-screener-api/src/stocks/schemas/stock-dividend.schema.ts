// src/schemas/stock-dividend.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StockDividendDocument = StockDividend & Document;

@Schema({ timestamps: true })
export class StockDividend {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  date: string;

  @Prop()
  label: string;

  @Prop()
  adjDividend: number;

  @Prop()
  dividend: number;

  @Prop()
  recordDate: string;

  @Prop()
  paymentDate: string;

  @Prop()
  declarationDate: string;
}

export const StockDividendSchema = SchemaFactory.createForClass(StockDividend);
