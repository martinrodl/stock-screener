import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  FilterStringProperty,
  FilterNumberProperty,
  FilterCondition,
} from '../enums';

export class NumberFilterCriteriaDto {
  @IsEnum(FilterNumberProperty)
  property: FilterNumberProperty;

  @IsEnum(FilterCondition)
  condition: FilterCondition;

  @IsNotEmpty()
  value: number;
}

export class StringFilterCriteriaDto {
  @IsEnum(FilterStringProperty)
  property: FilterStringProperty;

  @IsEnum(FilterCondition)
  condition: FilterCondition;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class RatioCriteriaDto {
  @IsEnum(FilterNumberProperty)
  numerator: FilterNumberProperty;

  @IsEnum(FilterNumberProperty)
  denominator: FilterNumberProperty;

  @IsEnum(FilterCondition)
  condition: FilterCondition;

  @IsNotEmpty()
  value: number;
}

export class CreateFilterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NumberFilterCriteriaDto)
  numberCriteria?: NumberFilterCriteriaDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StringFilterCriteriaDto)
  stringCriteria?: StringFilterCriteriaDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RatioCriteriaDto)
  ratioCriteria?: RatioCriteriaDto[];

  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
