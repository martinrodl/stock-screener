import {
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  Body,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  StocksService,
  CountedService,
  MetricsService,
  StatementsService,
  AnalystRatingsService,
  OutlookService,
} from '../services';
import { Stock, Profile } from '../schemas';
import { UpdateStockListDto } from '../dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeriodType } from '../enums';

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
    private readonly countedService: CountedService,
    private readonly metricsService: MetricsService,
    private readonly statementsService: StatementsService,
    private readonly analystRatingsService: AnalystRatingsService,
    private readonly outlookService: OutlookService,
  ) {}

  @Get()
  async getStocks(): Promise<Stock[]> {
    return this.stocksService.findAll();
  }

  @Get(':symbol')
  async getStock(@Param('symbol') symbol: string): Promise<Stock> {
    return this.stocksService.getStock(symbol);
  }

  @Post('updatestocklist')
  @HttpCode(204)
  async updateStocksList(
    @Body() updateStockListDto: UpdateStockListDto,
  ): Promise<void> {
    const { stockExchange } = updateStockListDto;
    await this.stocksService.updateStocksList(stockExchange);
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiResponse({
    status: 200,
    description:
      'Update statements, metrics, outlook data, ratings and counted value of specific stock',
  })
  @Post('update/:symbol')
  @HttpCode(204)
  async updateStockValues(
    @Param('symbol') symbol: string,
    @Query('periodType', new DefaultValuePipe('annual'))
    periodType: 'annual' | 'quarter',
  ): Promise<void> {
    await this.statementsService.saveStatements(symbol);
    await this.metricsService.saveMetrics(symbol);
    await this.outlookService.saveOutlookData(symbol);
    await this.analystRatingsService.saveAnalystRatings(symbol);
    await this.countedService.updateStockValues(symbol, periodType);
  }

  @Post('update/counted/:symbol')
  async updateCountedStockValues(
    @Param('symbol') symbol: string,
    @Query('periodType', new DefaultValuePipe('annual'))
    periodType: 'annual' | 'quarter',
  ): Promise<void> {
    await this.countedService.updateStockValues(symbol, periodType);
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns metrics for the specified stock',
  })
  @Get('metrics/:identifier')
  public async getMetrics(
    @Param('identifier') identifier: string,
    @Query('periodType') periodType: PeriodType,
  ) {
    return this.metricsService.getMetrics(identifier, { periodType });
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns statements for the specified stock',
  })
  @Get('statements/:identifier')
  public async getStatements(
    @Param('identifier') identifier: string,
    @Query('periodType') periodType: PeriodType,
  ) {
    return this.statementsService.getStatements(identifier, periodType);
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns statements for the specified stock',
  })
  @Get('groupstatements/:symbol')
  public async getGroupStatements(
    @Param('symbol') identifier: string,
    @Query('periodType') periodType: PeriodType,
  ) {
    return this.statementsService.getGroupStatements(identifier, periodType);
  }

  @Get(':symbol/profile')
  async getProfile(@Param('symbol') symbol: string): Promise<Profile> {
    return this.stocksService.getProfile(symbol);
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns metrics for the specified stock',
  })
  @Get('groupmetrics/:symbol')
  public async getGroupMetrics(
    @Param('symbol') identifier: string,
    @Query('periodType') periodType: PeriodType,
  ) {
    return this.metricsService.getGroupMetrics(identifier, periodType);
  }
}
