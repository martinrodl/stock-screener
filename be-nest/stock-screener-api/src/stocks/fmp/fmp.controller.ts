import { Controller, Post, Param, Get, Query } from '@nestjs/common';
import { StatementsService } from './services/statements.service';
import { GetSpecificPropertiesDto } from './dto/get-specific-properties.dto';

@Controller('fmp')
export class FmpController {
  constructor(private readonly statementsService: StatementsService) {}

  @Post(':symbol/fetch-and-save')
  async fetchAndSaveStatements(@Param('symbol') symbol: string) {
    await this.statementsService.saveStatements(symbol);
  }

  @Get(':symbol/combine')
  async getCombinedData(
    @Param('symbol') symbol: string,
    @Query() query: GetSpecificPropertiesDto,
  ) {
    const { periodType, properties } = query;
    return this.statementsService.getCombinedData(
      symbol,
      periodType,
      properties,
    );
  }
}
