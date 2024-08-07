import { ApiProperty } from '@nestjs/swagger';

export class CountriesResponseDto {
  @ApiProperty({ type: [String], description: 'List of unique countries' })
  countries: string[];
}

export class SectorsResponseDto {
  @ApiProperty({ type: [String], description: 'List of unique sectors' })
  sectors: string[];
}

export class IndustriesResponseDto {
  @ApiProperty({ type: [String], description: 'List of unique industries' })
  industries: string[];
}
