// src/repositories/outlook.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AnalystRatingsDetailed,
  AnalystRatingsDetailedDocument,
} from '../schemas/analyst-ratings-detailed.schema';
import {
  InsideTrades,
  InsideTradesDocument,
} from '../schemas/inside-trades.schema';
import {
  KeyExecutives,
  KeyExecutivesDocument,
} from '../schemas/key-executives.schema';
import {
  SplitsHistory,
  SplitsHistoryDocument,
} from '../schemas/splits-history.schema';
import {
  StockDividend,
  StockDividendDocument,
} from '../schemas/stock-dividend.schema';
import { StockNews, StockNewsDocument } from '../schemas/stock-news.schema';
import { Profile, ProfileDocument } from '../schemas/profile.schema';

@Injectable()
export class OutlookRepository {
  constructor(
    @InjectModel(AnalystRatingsDetailed.name)
    private analystRatingsDetailedModel: Model<AnalystRatingsDetailedDocument>,
    @InjectModel(InsideTrades.name)
    private insideTradesModel: Model<InsideTradesDocument>,
    @InjectModel(KeyExecutives.name)
    private keyExecutivesModel: Model<KeyExecutivesDocument>,
    @InjectModel(SplitsHistory.name)
    private splitsHistoryModel: Model<SplitsHistoryDocument>,
    @InjectModel(StockDividend.name)
    private stockDividendModel: Model<StockDividendDocument>,
    @InjectModel(StockNews.name)
    private stockNewsModel: Model<StockNewsDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  private async insertManyIfNotExistsHelper(
    model: Model<any>,
    documents: any[],
  ): Promise<void> {
    for (const doc of documents) {
      const existingDoc = await model.findOne({ ...doc }).exec();
      if (!existingDoc) {
        await model.create(doc);
      }
    }
  }

  async insertAnalystRatingsDetailed(
    docs: AnalystRatingsDetailedDocument[],
  ): Promise<void> {
    await this.insertManyIfNotExistsHelper(
      this.analystRatingsDetailedModel,
      docs,
    );
  }

  async insertInsideTrades(docs: InsideTradesDocument[]): Promise<void> {
    await this.insertManyIfNotExistsHelper(this.insideTradesModel, docs);
  }

  async insertKeyExecutives(docs: KeyExecutivesDocument[]): Promise<void> {
    await this.insertManyIfNotExistsHelper(this.keyExecutivesModel, docs);
  }

  async insertSplitsHistory(docs: SplitsHistoryDocument[]): Promise<void> {
    await this.insertManyIfNotExistsHelper(this.splitsHistoryModel, docs);
  }

  async insertStockDividend(docs: StockDividendDocument[]): Promise<void> {
    await this.insertManyIfNotExistsHelper(this.stockDividendModel, docs);
  }

  async insertStockNews(docs: StockNewsDocument[]): Promise<void> {
    await this.insertManyIfNotExistsHelper(this.stockNewsModel, docs);
  }

  async insertProfile(profile: ProfileDocument): Promise<void> {
    const existingProfile = await this.profileModel
      .findOne({ stock: profile.stock })
      .exec();
    if (!existingProfile) {
      await this.profileModel.create(profile);
    } else {
      await this.profileModel
        .updateOne({ stock: profile.stock }, profile)
        .exec();
    }
  }

  async findProfile(filter: any): Promise<Profile[]> {
    return this.profileModel.find(filter).exec();
  }
}
