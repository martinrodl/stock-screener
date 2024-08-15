import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ETFService } from '../services/etf.service';
import { ETF } from '../schemas/etf.schema';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('ETFs')
@Controller('etfs')
export class ETFController {
  constructor(private readonly etfService: ETFService) {}

  @ApiOperation({ summary: 'Get all ETFs with pagination and sorting' })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Number of items to skip',
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Field to sort by (expenseRatio, 1y, 3y, 5y, 10y)',
    example: 'expenseRatio',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order (asc or desc)',
    example: 'asc',
  })
  @ApiResponse({ status: 200, description: 'List of ETFs' })
  @Get()
  async getAllETFs(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = '',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.etfService.getAllETFs(skip, limit, sortBy, sortOrder);
  }

  @ApiOperation({ summary: 'Get a specific ETF by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the ETF',
    example: '611a3b3e5f3b3b001ff4f060',
  })
  @ApiResponse({ status: 200, description: 'The ETF data' })
  @Get(':id')
  async getETFById(@Param('id') id: string): Promise<ETF> {
    return this.etfService.getETFById(id);
  }

  @ApiOperation({ summary: 'Get a specific ETF by symbol' })
  @ApiParam({
    name: 'symbol',
    description: 'The symbol of the ETF',
    example: 'SPY',
  })
  @ApiResponse({ status: 200, description: 'The ETF data' })
  @Get('symbol/:symbol')
  async getETFBySymbol(@Param('symbol') symbol: string): Promise<ETF> {
    return this.etfService.getETFBySymbol(symbol);
  }

  @ApiOperation({ summary: 'Create a new ETF' })
  @ApiBody({ type: ETF })
  @ApiResponse({ status: 201, description: 'The ETF has been created' })
  @Post()
  async createETF(@Body() etfData: ETF): Promise<ETF> {
    return this.etfService.createETF(etfData);
  }

  @ApiOperation({ summary: 'Update an existing ETF by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the ETF to update',
    example: '611a3b3e5f3b3b001ff4f060',
  })
  @ApiBody({ type: ETF })
  @ApiResponse({ status: 200, description: 'The updated ETF' })
  @Put(':id')
  async updateETFById(
    @Param('id') id: string,
    @Body() etfData: Partial<ETF>,
  ): Promise<ETF> {
    return this.etfService.updateETFById(id, etfData);
  }

  @ApiOperation({ summary: 'Delete an ETF by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the ETF to delete',
    example: '611a3b3e5f3b3b001ff4f060',
  })
  @ApiResponse({ status: 200, description: 'The ETF has been deleted' })
  @Delete(':id')
  async deleteETFById(@Param('id') id: string): Promise<void> {
    return this.etfService.deleteETFById(id);
  }
}
