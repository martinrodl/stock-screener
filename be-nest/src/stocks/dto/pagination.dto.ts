import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number) // Ensures that the value is converted to a number
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number) // Ensures that the value is converted to a number
  limit: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  periodType?: 'annual' | 'quarterly';
}
