import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  FilterStringProperty,
  FilterNumberProperty,
  FilterNumberCondition,
  FilterStringCondition,
  MultiCriteriaType,
} from '../enums';

export class NumberFilterCriteriaDto {
  @ApiProperty({
    enum: FilterNumberProperty,
    enumName: 'FilterNumberProperty',
    description: 'Numeric property to filter by',
  })
  @IsEnum(FilterNumberProperty)
  property: FilterNumberProperty;

  @ApiProperty({
    enum: FilterNumberCondition,
    enumName: 'FilterNumberCondition',
    description: 'Condition to apply for the numeric property',
  })
  @IsEnum(FilterNumberCondition)
  condition: FilterNumberCondition;

  @ApiProperty({
    description:
      'Value to compare against the property with the specified condition',
  })
  @IsNumber()
  value: number;
}

export class StringFilterCriteriaDto {
  @ApiProperty({
    enum: FilterStringProperty,
    enumName: 'FilterStringProperty',
    description: 'String property to filter by',
  })
  @IsEnum(FilterStringProperty)
  property: FilterStringProperty;

  @ApiProperty({
    enum: FilterStringCondition,
    enumName: 'FilterStringCondition',
    description: 'Condition to apply for the string property',
  })
  @IsEnum(FilterStringCondition)
  condition: FilterStringCondition;

  @ApiProperty({ description: 'String value to compare against the property' })
  @IsNotEmpty()
  @IsString()
  value: string;
}

export class RatioCriteriaDto {
  @ApiProperty({
    enum: FilterNumberProperty,
    enumName: 'FilterNumberProperty',
    description: 'Numerator property for the ratio',
  })
  @IsEnum(FilterNumberProperty)
  numerator: FilterNumberProperty;

  @ApiProperty({
    enum: FilterNumberProperty,
    enumName: 'FilterNumberProperty',
    description: 'Denominator property for the ratio',
  })
  @IsEnum(FilterNumberProperty)
  denominator: FilterNumberProperty;

  @ApiProperty({
    enum: FilterNumberCondition,
    enumName: 'FilterNumberCondition',
    description: 'Condition to apply for the ratio',
  })
  @IsEnum(FilterNumberCondition)
  condition: FilterNumberCondition;

  @ApiProperty({ description: 'Value to compare the calculated ratio against' })
  @IsNotEmpty()
  value: number;
}

export class MultiCriteriaDto {
  @ApiProperty({
    enum: MultiCriteriaType,
    description: 'Type of multi-criteria filter',
    example: 'country',
  })
  @IsEnum(MultiCriteriaType)
  type: MultiCriteriaType;

  @ApiProperty({
    description: 'Values for the multi-criteria filter',
    type: [String],
    example: ['US', 'CA'],
  })
  @IsArray()
  @IsString({ each: true })
  values: string[];
}

export class CreateFilterDto {
  @ApiProperty({ description: 'Name of the filter' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: [NumberFilterCriteriaDto],
    description: 'Criteria for filtering with number properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NumberFilterCriteriaDto)
  numberCriteria?: NumberFilterCriteriaDto[];

  @ApiProperty({
    type: [StringFilterCriteriaDto],
    description: 'Criteria for filtering with string properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StringFilterCriteriaDto)
  stringCriteria?: StringFilterCriteriaDto[];

  @ApiProperty({
    type: [RatioCriteriaDto],
    description: 'Criteria for filtering based on ratios of number properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RatioCriteriaDto)
  ratioCriteria?: RatioCriteriaDto[];

  @ApiProperty({
    type: [MultiCriteriaDto],
    description: 'Criteria for filtering with multi-select properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MultiCriteriaDto)
  multiCriteria?: MultiCriteriaDto[];
}

export class ApplyFilterDto {
  @ApiProperty({
    type: [NumberFilterCriteriaDto],
    description: 'Criteria for filtering with number properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NumberFilterCriteriaDto)
  numberCriteria?: NumberFilterCriteriaDto[];

  @ApiProperty({
    type: [StringFilterCriteriaDto],
    description: 'Criteria for filtering with string properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StringFilterCriteriaDto)
  stringCriteria?: StringFilterCriteriaDto[];

  @ApiProperty({
    type: [RatioCriteriaDto],
    description: 'Criteria for filtering based on ratios of number properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RatioCriteriaDto)
  ratioCriteria?: RatioCriteriaDto[];

  @ApiProperty({
    type: [MultiCriteriaDto],
    description: 'Criteria for filtering with multi-select properties',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MultiCriteriaDto)
  multiCriteria?: MultiCriteriaDto[];
}
