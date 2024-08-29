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
    @Query('periodType') periodType: PeriodType,
  ): Promise<void> {
    await this.statementsService.saveStatements(symbol);
    await this.outlookService.saveOutlookData(symbol);
    await this.metricsService.saveMetrics(symbol);
    await this.analystRatingsService.saveAnalystRatings(symbol);
    await this.countedService.updateStockValues(symbol, periodType);
  }

  @Post('update/counted/:symbol')
  async updateCountedStockValues(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
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
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of statements to return',
    example: 3,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns statements for the specified stock',
  })
  @Get('statements/:identifier')
  public async getStatements(
    @Param('identifier') identifier: string,
    @Query('periodType') periodType: PeriodType,
    @Query('limit') limit: number = 5,
  ) {
    return this.statementsService.getStatements(identifier, periodType, limit);
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
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of statements to return',
    example: 3,
  })
  @Get('groupstatements/:symbol')
  public async getGroupStatements(
    @Param('symbol') identifier: string,
    @Query('periodType') periodType: PeriodType,
    @Query('limit') limit: number = 5,
  ) {
    return this.statementsService.getGroupStatements(
      identifier,
      periodType,
      limit,
    );
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
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of statements to return',
    example: 3,
  })
  @Get('groupmetrics/:symbol')
  public async getGroupMetrics(
    @Param('symbol') identifier: string,
    @Query('periodType') periodType: PeriodType,
    @Query('limit') limit: number = 5,
  ) {
    return this.metricsService.getGroupMetrics(identifier, periodType, limit);
  }

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of news items to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated news for the specified stock symbol',
  })
  @Get('news/:symbol')
  public async getStockNews(
    @Param('symbol') symbol: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.outlookService.getStockNews(symbol, page, limit);
  }
}
