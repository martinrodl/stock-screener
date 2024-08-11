import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgressDocument = Progress & Document;

@Schema()
export class Progress {
  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  symbol: string;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
