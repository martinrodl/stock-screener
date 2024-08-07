import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  FilterNumberProperty,
  FilterStringProperty,
  FilterNumberCondition,
  FilterStringCondition,
  MultiCriteriaType,
} from '../enums';

export type FilterDocument = Filter & Document;

class NumberFilterCriteria {
  @ApiProperty({
    enum: FilterNumberProperty,
    description: 'Numeric property to filter by',
  })
  @Prop({ enum: FilterNumberProperty, type: String, required: true })
  property: FilterNumberProperty;

  @ApiProperty({
    enum: FilterNumberCondition,
    description: 'Condition to apply for the numeric property',
  })
  @Prop({ enum: FilterNumberCondition, type: String, required: true })
  condition: FilterNumberCondition;

  @ApiProperty({
    description:
      'Value to compare against the property with the specified condition',
  })
  @Prop({ required: true, type: Number })
  value: number;
}

class StringFilterCriteria {
  @ApiProperty({
    enum: FilterStringProperty,
    description: 'String property to filter by',
  })
  @Prop({ enum: FilterStringProperty, type: String, required: true })
  property: FilterStringProperty;

  @ApiProperty({
    enum: FilterStringCondition,
    description: 'Condition to apply for the string property',
  })
  @Prop({ enum: FilterStringCondition, type: String, required: true })
  condition: FilterStringCondition;

  @ApiProperty({ description: 'String value to compare against the property' })
  @Prop({ required: true, type: String })
  value: string;
}

class RatioCriteria {
  @ApiProperty({
    enum: FilterNumberProperty,
    description: 'Numerator property for the ratio',
  })
  @Prop({ enum: FilterNumberProperty, type: String, required: true })
  numerator: FilterNumberProperty;

  @ApiProperty({
    enum: FilterNumberProperty,
    description: 'Denominator property for the ratio',
  })
  @Prop({ enum: FilterNumberProperty, type: String, required: true })
  denominator: FilterNumberProperty;

  @ApiProperty({
    enum: FilterNumberCondition,
    description: 'Condition to apply for the ratio',
  })
  @Prop({ enum: FilterNumberCondition, type: String, required: true })
  condition: FilterNumberCondition;

  @ApiProperty({ description: 'Value to compare the calculated ratio against' })
  @Prop({ required: true, type: Number })
  value: number;
}

class MultiCriteria {
  @ApiProperty({
    enum: MultiCriteriaType,
    description: 'Type of multi-criteria filter',
  })
  @Prop({ enum: MultiCriteriaType, type: String, required: true })
  type: MultiCriteriaType;

  @ApiProperty({
    description: 'Values for the multi-criteria filter',
    type: [String],
  })
  @Prop({ type: [String], required: true })
  values: string[];
}

@Schema()
export class Filter {
  @ApiProperty({ description: 'Name of the filter' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: [NumberFilterCriteria],
    description: 'Criteria for filtering with number properties',
  })
  @Prop({ type: [NumberFilterCriteria], required: false })
  numberCriteria?: NumberFilterCriteria[];

  @ApiProperty({
    type: [StringFilterCriteria],
    description: 'Criteria for filtering with string properties',
  })
  @Prop({ type: [StringFilterCriteria], required: false })
  stringCriteria?: StringFilterCriteria[];

  @ApiProperty({
    type: [RatioCriteria],
    description: 'Criteria for filtering based on ratios of number properties',
  })
  @Prop({ type: [RatioCriteria], required: false })
  ratioCriteria?: RatioCriteria[];

  @ApiProperty({
    type: [MultiCriteria],
    description: 'Criteria for filtering with multi-select properties',
  })
  @Prop({ type: [MultiCriteria], required: false })
  multiCriteria?: MultiCriteria[];

  @ApiProperty({
    description: 'MongoDB User ID that owns the filter',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
