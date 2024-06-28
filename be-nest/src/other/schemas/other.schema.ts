import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtherDocument = Other & Document;

@Schema()
export class Other {
  @Prop()
  date: Date;

  @Prop({ default: 1 })
  currentYield: number;
}

export const OtherSchema = SchemaFactory.createForClass(Other);
