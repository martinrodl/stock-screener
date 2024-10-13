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
    await this.stocksService.updateFullQuote(symbol);
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
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @Get('groupstatements/:symbol')
  public async getGroupStatements(
    @Param('symbol') identifier: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit') limit: number = 5,
  ) {
    return this.statementsService.getGroupStatements(
      identifier,
      periodType,
      page,
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
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @Get('groupmetrics/:symbol')
  public async getGroupMetrics(
    @Param('symbol') identifier: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit') limit: number = 5,
  ) {
    return this.metricsService.getGroupMetrics(
      identifier,
      periodType,
      page,
      limit,
    );
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

  @ApiResponse({
    status: 200,
    description: 'Returns actual values for the specified stock',
  })
  @Get(':symbol/actual-values')
  public async getStockActualValues(@Param('symbol') symbol: string) {
    return this.stocksService.getStockActualValues(symbol);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns analyst ratings summary for the specified stock',
  })
  @Get(':symbol/latest-analyst-ratings')
  public async getAnalystRatingsSummary(@Param('symbol') symbol: string) {
    return this.analystRatingsService.findLatestByStockId(symbol);
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
    description: 'Number of analyst ratings to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated analyst ratings for the specified stock symbol',
  })
  @Get(':symbol/analyst-ratings')
  public async getAnalystRatings(
    @Param('symbol') symbol: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.analystRatingsService.getAnalystRatingsWithPagination(
      symbol,
      page,
      limit,
    );
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
    description: 'Number of analyst ratings to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated detaled ratings for the specified stock symbol',
  })
  @Get('analyst-ratings-detailed/:symbol')
  public async getAnalystRatingsDetailed(
    @Param('symbol') symbol: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.analystRatingsService.getAnalystRatingsDetailedWithPagination(
      symbol,
      page,
      limit,
    );
  }

  @ApiResponse({
    status: 200,
    description:
      'Returns the latest analyst ratings detailed for the specified stock',
  })
  @Get('analyst-ratings-detailed/:symbol/latest')
  public async getLatestAnalystRatingsDetailed(
    @Param('symbol') symbol: string,
  ) {
    return this.analystRatingsService.findLatestDetailedByStockId(symbol);
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
    description: 'Number of inside trades to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated inside trades for the specified stock symbol',
  })
  @Get(':symbol/inside-trades')
  public async getPaginatedInsideTrades(
    @Param('symbol') symbol: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.outlookService.getPaginatedInsideTrades(symbol, page, limit);
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of statements to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated balance sheet statements for the specified stock symbol',
  })
  @Get(':symbol/balance-sheet-statements')
  public async getBalanceSheetStatements(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const statements = await this.statementsService.getBalanceSheetStatements(
      symbol,
      periodType,
      page,
      limit,
    );
    return {
      statements,
      page,
      limit,
    };
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of statements to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated cash flow statements for the specified stock symbol',
  })
  @Get(':symbol/cash-flow-statements')
  public async getCashFlowStatements(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const statements = await this.statementsService.getCashFlowStatements(
      symbol,
      periodType,
      page,
      limit,
    );
    return {
      statements,
      page,
      limit,
    };
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of statements to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated income statements for the specified stock symbol',
  })
  @Get(':symbol/income-statements')
  public async getIncomeStatements(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const statements = await this.statementsService.getIncomeStatements(
      symbol,
      periodType,
      page,
      limit,
    );
    return {
      statements,
      page,
      limit,
    };
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of metrics to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated income growth metrics for the specified stock symbol',
  })
  @Get(':symbol/income-growth-metrics')
  public async getIncomeGrowthMetrics(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const metrics = await this.metricsService.getIncomeGrowthMetrics(
      symbol,
      periodType,
      page,
      limit,
    );
    return {
      metrics,
      page,
      limit,
    };
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of metrics to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated key metrics for the specified stock symbol',
  })
  @Get(':symbol/key-metrics')
  public async getKeyMetrics(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const metrics = await this.metricsService.getKeyMetrics(
      symbol,
      periodType,
      page,
      limit,
    );
    return {
      metrics,
      page,
      limit,
    };
  }

  @ApiQuery({
    name: 'periodType',
    required: true,
    enum: PeriodType,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of metrics to return per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns paginated profit growth metrics for the specified stock symbol',
  })
  @Get(':symbol/profit-growth-metrics')
  public async getProfitGrowthMetrics(
    @Param('symbol') symbol: string,
    @Query('periodType') periodType: PeriodType,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    const metrics = await this.metricsService.getProfitGrowthMetrics(
      symbol,
      periodType,
      page,
      limit,
    );
    return {
      metrics,
      page,
      limit,
    };
  }
}
