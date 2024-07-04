import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  FilterNumberProperty,
  FilterStringProperty,
  FilterCondition,
} from '../enums';

export type FilterDocument = Filter & Document;

class NumberFilterCriteria {
  @Prop({ enum: FilterNumberProperty, type: Number, required: true })
  property: FilterNumberProperty;

  @Prop({ enum: FilterCondition, type: String, required: true })
  condition: FilterCondition;

  @Prop({ required: true, type: Number })
  value: number;
}

class StringFilterCriteria {
  @Prop({ enum: FilterStringProperty, type: String, required: true })
  property: FilterStringProperty;

  @Prop({ enum: FilterCondition, type: String, required: true })
  condition: FilterCondition;

  @Prop({ required: true, type: String })
  value: string;
}

class RatioCriteria {
  @Prop({ enum: FilterNumberProperty, type: Number, required: true })
  numerator: FilterNumberProperty;

  @Prop({ enum: FilterNumberProperty, type: Number, required: true })
  denominator: FilterNumberProperty;

  @Prop({ enum: FilterCondition, type: String, required: true })
  condition: FilterCondition;

  @Prop({ required: true, type: Number })
  value: number;
}

@Schema()
export class Filter {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [NumberFilterCriteria], required: false })
  numberCriteria?: NumberFilterCriteria[];

  @Prop({ type: [StringFilterCriteria], required: false })
  stringCriteria?: StringFilterCriteria[];

  @Prop({ type: [RatioCriteria], required: false })
  ratioCriteria?: RatioCriteria[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
