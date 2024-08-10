import { IsEnum, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

import { PeriodType } from '../enums';

export class GetSpecificPropertiesDto {
  @IsEnum(['quarter', 'annual'], {
    message: 'periodType must be one of the following values: quarter, annual',
  })
  periodType: PeriodType;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  properties: string[];
}
