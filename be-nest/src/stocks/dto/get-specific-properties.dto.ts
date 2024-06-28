import { IsEnum, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class GetSpecificPropertiesDto {
  @IsEnum(['quarter', 'annual'], {
    message: 'periodType must be one of the following values: quarter, annual',
  })
  periodType: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  properties: string[];
}
