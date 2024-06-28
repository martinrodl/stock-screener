// src/schemas/key-executives.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type KeyExecutivesDocument = KeyExecutives & Document;

@Schema({ timestamps: true })
export class KeyExecutives {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock
  @Prop()
  title: string;

  @Prop()
  name: string;

  @Prop()
  pay: number;

  @Prop()
  currencyPay: string;

  @Prop()
  gender: string;

  @Prop()
  yearBorn: number;

  @Prop()
  titleSince: string;
}

export const KeyExecutivesSchema = SchemaFactory.createForClass(KeyExecutives);
