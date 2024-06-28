// src/schemas/profile.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'Stock' })
  stock: Types.ObjectId; // Reference to Stock

  @Prop()
  price: number;

  @Prop()
  beta: number;

  @Prop()
  volAvg: number;

  @Prop()
  mktCap: number;

  @Prop()
  lastDiv: number;

  @Prop()
  range: string;

  @Prop()
  changes: number;

  @Prop()
  companyName: string;

  @Prop()
  currency: string;

  @Prop()
  cik: string;

  @Prop()
  isin: string;

  @Prop()
  cusip: string;

  @Prop()
  exchange: string;

  @Prop()
  exchangeShortName: string;

  @Prop()
  industry: string;

  @Prop()
  website: string;

  @Prop()
  description: string;

  @Prop()
  ceo: string;

  @Prop()
  sector: string;

  @Prop()
  country: string;

  @Prop()
  fullTimeEmployees: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop()
  dcfDiff: number;

  @Prop()
  dcf: number;

  @Prop()
  image: string;

  @Prop()
  ipoDate: string;

  @Prop()
  defaultImage: boolean;

  @Prop()
  isEtf: boolean;

  @Prop()
  isActivelyTrading: boolean;

  @Prop()
  isAdr: boolean;

  @Prop()
  isFund: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
