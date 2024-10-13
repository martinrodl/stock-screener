import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { StocksRepository, OutlookRepository } from '../repositories';
import { Stock, StockDocument, Profile } from '../schemas';

@Injectable()
export class StocksService {
  constructor(
    private readonly stocksRepository: StocksRepository,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => OutlookRepository))
    private readonly outlookRepository: OutlookRepository,
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
    const apiKey = process.env.API_KEY;

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
        pe: stock.pe,
        price: stock.price,
        marketCap: stock.marketCap,
      }));

      await this.stocksRepository.insertMany(stockDocuments);
    } catch (error) {
      console.error('Error updating stocks list:', error);
      throw new Error('Failed to update stocks list');
    }
  }

  async getProfile(symbol: string): Promise<Profile> {
    const stock = (await this.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }

    if (!stock.profile) {
      throw new NotFoundException(
        `Profile for stock with symbol ${symbol} not found`,
      );
    }
    return stock.profile;
  }

  async getStockActualValues(symbol: string) {
    const stock = await this.stocksRepository.findByIdOrSymbol(symbol);
    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }
    return stock.actualValues;
  }

  async updateFullQuote(symbol: string): Promise<StockDocument> {
    const apiKey = process.env.API_KEY;
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
    try {
      const response = await firstValueFrom(new HttpService().get(url));
      const stockData = response.data[0];

      if (!stockData) {
        throw new NotFoundException(
          `Quote for stock symbol ${symbol} not found`,
        );
      }

      const updatedProperties: Partial<Stock> = {};

      if (stockData.price !== undefined) {
        updatedProperties.price = stockData.price;
      }

      if (stockData.marketCap !== undefined) {
        updatedProperties.marketCap = stockData.marketCap;
      }

      if (stockData.pe !== undefined) {
        updatedProperties.pe = stockData.pe;
      }

      if (Object.keys(updatedProperties).length > 0) {
        await this.stocksRepository.update(symbol, updatedProperties);
      }
      return stockData;
    } catch (error) {
      console.error('Error updating stock quote:', error);
      throw new Error('Failed to update stock quote');
    }
  }
}
