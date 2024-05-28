import { Controller, Get, Post, Param, HttpCode, Body } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './schemas/stock.schema';
import { UpdateStockListDto } from './dto/update-stock-list.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async getStocks(): Promise<Stock[]> {
    return this.stocksService.findAll();
  }

  @Get(':symbol')
  async getStock(@Param('symbol') symbol: string): Promise<Stock> {
    return this.stocksService.getStock(symbol);
  }

  @Post('update')
  @HttpCode(204)
  async updateStocksList(
    @Body() updateStockListDto: UpdateStockListDto,
  ): Promise<void> {
    const { stockExchange } = updateStockListDto;
    await this.stocksService.updateStocksList(stockExchange);
  }
}
