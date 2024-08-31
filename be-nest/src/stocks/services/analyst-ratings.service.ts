import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AnalystRatingsRepository } from '../repositories';
import { StocksService } from '../services';
import {
  AnalystRatings,
  AnalystRatingsDocument,
  AnalystRatingsDetailedDocument,
  StockDocument,
} from '../schemas';
import { Types } from 'mongoose';

@Injectable()
export class AnalystRatingsService {
  private readonly apiKey = process.env.API_KEY;

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

  async findLatestByStockId(
    symbol: string,
  ): Promise<AnalystRatingsDocument | null> {
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;
    return this.analystRatingsRepository.findLatestByStockId(
      stockId.toHexString(),
    );
  }

  async getAnalystRatingsWithPagination(
    symbol: string,
    page: number,
    limit: number,
  ) {
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;

    const { ratings, total } =
      await this.analystRatingsRepository.findPaginatedByStockId(
        stockId.toHexString(),
        page,
        limit,
      );

    return {
      ratings,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAnalystRatingsDetailedWithPagination(
    symbol: string,
    page: number,
    limit: number,
  ) {
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;

    const { ratings, total } =
      await this.analystRatingsRepository.findDetailedPaginatedByStockId(
        stockId.toHexString(),
        page,
        limit,
      );

    return {
      ratings,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findLatestDetailedByStockId(
    symbol: string,
  ): Promise<AnalystRatingsDetailedDocument | null> {
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;
    return this.analystRatingsRepository.findLatestDetailedByStockId(stockId);
  }
}
