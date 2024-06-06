// src/services/outlook.service.ts
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OutlookRepository } from '../repositories/outlook.repository';
import { StocksService } from '../../stocks.service';
import { StockDocument } from '../../schemas/stock.schema';
import { Types } from 'mongoose';

@Injectable()
export class OutlookService {
  private readonly apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

  constructor(
    private readonly httpService: HttpService,
    private readonly outlookRepository: OutlookRepository,
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
  ) {}

  async fetchOutlookData(symbol: string) {
    const url = `https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol}&apikey=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async saveOutlookData(symbol: string) {
    const data = await this.fetchOutlookData(symbol);
    const stock = await this.stocksService.getStock(symbol);
    const stockId = (stock as StockDocument)._id as Types.ObjectId;

    if (data.rating) {
      await this.outlookRepository.insertAnalystRatingsDetailed(
        data.rating.map((rating) => ({ ...rating, stock: stockId })),
      );
    }
    if (data.insideTrades) {
      await this.outlookRepository.insertInsideTrades(
        data.insideTrades.map((trade) => ({ ...trade, stock: stockId })),
      );
    }
    if (data.keyExecutives) {
      await this.outlookRepository.insertKeyExecutives(
        data.keyExecutives.map((exec) => ({ ...exec, stock: stockId })),
      );
    }
    if (data.splitsHistory) {
      await this.outlookRepository.insertSplitsHistory(
        data.splitsHistory.map((split) => ({ ...split, stock: stockId })),
      );
    }
    if (data.stockDividend) {
      await this.outlookRepository.insertStockDividend(
        data.stockDividend.map((dividend) => ({ ...dividend, stock: stockId })),
      );
    }
    if (data.stockNews) {
      await this.outlookRepository.insertStockNews(
        data.stockNews.map((news) => ({ ...news, stock: stockId })),
      );
    }
    if (data.profile) {
      await this.outlookRepository.insertProfile({
        ...data.profile,
        stock: stockId,
      });
    }
  }
}
