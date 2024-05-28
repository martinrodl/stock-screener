import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ required: true, unique: true })
  symbol: string;

  @Prop()
  name: string;

  @Prop()
  exchange: string;

  @Prop()
  peRatio: number;

  @Prop()
  price: number;

  @Prop()
  marketCap: number;

  // Optionally include a list of cash flow statements
  @Prop({ type: [{ type: Types.ObjectId, ref: 'CashFlowStatement' }] })
  cashFlowStatements: Types.ObjectId[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
StockSchema.index({ symbol: 1 }, { unique: true });
