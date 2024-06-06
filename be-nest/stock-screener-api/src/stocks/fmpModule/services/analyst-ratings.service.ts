// src/services/analyst-ratings.service.ts
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AnalystRatingsRepository } from '../repositories/analyst-ratings.repository';
import { StocksService } from '../../stocks.service';
import { AnalystRatings } from '../schemas/analyst-ratings.schema';
import { StockDocument } from '../../schemas/stock.schema';
import { Types } from 'mongoose';

@Injectable()
export class AnalystRatingsService {
  private readonly apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

  constructor(
    private readonly analystRatingsRepository: AnalystRatingsRepository,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
  ) {}

  async fetchAnalystRatings(symbol: string): Promise<AnalystRatings[]> {
    const url = `https://financialmodelingprep.com/api/v3/analyst-stock-recommendations/${symbol}?apikey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async saveAnalystRatings(symbol: string): Promise<void> {
    const ratings = await this.fetchAnalystRatings(symbol);
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;

    await this.analystRatingsRepository.insertManyIfNotExists(
      ratings.map((rating) => ({
        ...rating,
        stock: stockId,
      })),
    );
  }

  async getAnalystRatings(symbol: string): Promise<AnalystRatings[]> {
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;

    return this.analystRatingsRepository.findByStockId(stockId.toHexString());
  }
}
