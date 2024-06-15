// src/schemas/stock-news.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StockNewsDocument = StockNews & Document;

@Schema({ timestamps: true })
export class StockNews {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  symbol: string;

  @Prop()
  publishedDate: string;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  site: string;

  @Prop()
  text: string;

  @Prop()
  url: string;
}

export const StockNewsSchema = SchemaFactory.createForClass(StockNews);
