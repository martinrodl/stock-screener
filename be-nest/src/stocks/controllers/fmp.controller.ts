import { Controller, Post, Param, Get, Query } from '@nestjs/common';
import {
  AnalystRatingsService,
  StatementsService,
  MetricsService,
  OutlookService,
} from '../services';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeriodType } from '../enums';

import { GetSpecificPropertiesDto } from '../dto';

@Controller('fmp')
export class FmpController {
  constructor(
    private readonly statementsService: StatementsService,
    private readonly metricsService: MetricsService,
    private readonly analystRatingsService: AnalystRatingsService,
    private readonly outlookService: OutlookService,
  ) {}

  @Post(':symbol/update-statements')
  async fetchAndSaveStatements(@Param('symbol') symbol: string) {
    await this.statementsService.saveStatements(symbol);
  }

  @Post(':symbol/update-metrics')
  async fetchAndSaveMetrics(@Param('symbol') symbol: string) {
    await this.metricsService.saveMetrics(symbol);
  }

  @Post(':symbol/update-analyst-ratings')
  async fetchAndSaveRarings(@Param('symbol') symbol: string) {
    await this.analystRatingsService.saveAnalystRatings(symbol);
  }

  @Post(':symbol/update-outlook')
  async fetchAndSaveOutlook(@Param('symbol') symbol: string) {
    await this.outlookService.saveOutlookData(symbol);
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
