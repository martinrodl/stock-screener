import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalystRatingsDocument = AnalystRatings & Document;

@Schema({ timestamps: true })
export class AnalystRatings {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  analystRatingsbuy: number;

  @Prop({ required: true })
  analystRatingsHold: number;

  @Prop({ required: true })
  analystRatingsSell: number;

  @Prop({ required: true })
  analystRatingsStrongSell: number;

  @Prop({ required: true })
  analystRatingsStrongBuy: number;
}

export const AnalystRatingsSchema =
  SchemaFactory.createForClass(AnalystRatings);
