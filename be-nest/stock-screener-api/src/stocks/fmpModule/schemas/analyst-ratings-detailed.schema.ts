// src/schemas/analyst-ratings-detailed.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalystRatingsDetailedDocument = AnalystRatingsDetailed & Document;

@Schema({ timestamps: true })
export class AnalystRatingsDetailed {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  date: string;

  @Prop()
  rating: string;

  @Prop()
  ratingScore: number;

  @Prop()
  ratingRecommendation: string;

  @Prop()
  ratingDetailsDCFScore: number;

  @Prop()
  ratingDetailsDCFRecommendation: string;

  @Prop()
  ratingDetailsROEScore: number;

  @Prop()
  ratingDetailsROERecommendation: string;

  @Prop()
  ratingDetailsROAScore: number;

  @Prop()
  ratingDetailsROARecommendation: string;

  @Prop()
  ratingDetailsDEScore: number;

  @Prop()
  ratingDetailsDERecommendation: string;

  @Prop()
  ratingDetailsPEScore: number;

  @Prop()
  ratingDetailsPERecommendation: string;

  @Prop()
  ratingDetailsPBScore: number;

  @Prop()
  ratingDetailsPBRecommendation: string;
}

export const AnalystRatingsDetailedSchema = SchemaFactory.createForClass(
  AnalystRatingsDetailed,
);
