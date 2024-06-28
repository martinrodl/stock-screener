import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { StocksRepository } from '../repositories';
import { Stock } from '../schemas';

@Injectable()
export class StocksService {
  constructor(
    private readonly stocksRepository: StocksRepository,
    private readonly httpService: HttpService,
  ) {}

  async getStock(symbol: string): Promise<Stock> {
    const stock = await this.stocksRepository.findOne(symbol);
    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }
    return stock;
  }

  async findAll(): Promise<Stock[]> {
    return this.stocksRepository.findAll();
  }

  async updateStocksList(stockExchange: string): Promise<void> {
    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

    const url = `https://financialmodelingprep.com/api/v3/symbol/${stockExchange}?apikey=${apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const stocks = response.data;

      const filteredStocks = stocks.filter(
        (stock) => stock.exchange === stockExchange,
      );

      const stockDocuments = filteredStocks.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        exchange: stock.exchange,
        peRatio: stock.peRatio,
        price: stock.price,
        marketCap: stock.marketCap,
      }));

      await this.stocksRepository.insertMany(stockDocuments);
    } catch (error) {
      console.error('Error updating stocks list:', error);
      throw new Error('Failed to update stocks list');
    }
  }
}
