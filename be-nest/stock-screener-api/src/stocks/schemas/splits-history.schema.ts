// src/schemas/splits-history.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SplitsHistoryDocument = SplitsHistory & Document;

@Schema({ timestamps: true })
export class SplitsHistory {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  date: string;

  @Prop()
  label: string;

  @Prop()
  numerator: number;

  @Prop()
  denominator: number;
}

export const SplitsHistorySchema = SchemaFactory.createForClass(SplitsHistory);
