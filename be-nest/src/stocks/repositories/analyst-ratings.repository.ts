import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AnalystRatings,
  AnalystRatingsDocument,
} from '../schemas/analyst-ratings.schema';
import {
  AnalystRatingsDetailedDocument,
  AnalystRatingsDetailed,
} from '../schemas/analyst-ratings-detailed.schema';

@Injectable()
export class AnalystRatingsRepository {
  constructor(
    @InjectModel(AnalystRatings.name)
    private readonly analystRatingsModel: Model<AnalystRatingsDocument>,
    @InjectModel(AnalystRatingsDetailed.name)
    private readonly analystRatingsDetailedModel: Model<AnalystRatingsDetailedDocument>,
  ) {}

  async findAll(): Promise<AnalystRatingsDocument[]> {
    return this.analystRatingsModel.find().exec();
  }

  async findByStockId(stockId: string): Promise<AnalystRatingsDocument[]> {
    return this.analystRatingsModel
      .find({ stock: new Types.ObjectId(stockId) })
      .exec();
  }

  async create(
    analystRatings: AnalystRatings,
  ): Promise<AnalystRatingsDocument> {
    const newAnalystRatings = new this.analystRatingsModel(analystRatings);
    return newAnalystRatings.save();
  }

  async insertManyIfNotExists(analystRatings: AnalystRatings[]): Promise<void> {
    for (const rating of analystRatings) {
      const existingRating = await this.analystRatingsModel
        .findOne({ stock: rating.stock, date: rating.date })
        .exec();
      if (!existingRating) {
        await this.analystRatingsModel.create(rating);
      }
    }
  }

  async findLatestByStockId(
    stockId: string,
  ): Promise<AnalystRatingsDocument | null> {
    return this.analystRatingsModel
      .findOne({ stock: new Types.ObjectId(stockId) })
      .sort({ date: -1 }) // Sort by date descending to get the latest entry
      .exec();
  }

  async findPaginatedByStockId(
    stockId: string,
    page: number,
    limit: number,
  ): Promise<{ ratings: AnalystRatingsDocument[]; total: number }> {
    const offset = (page - 1) * limit;
    const ratings = await this.analystRatingsModel
      .find({ stock: new Types.ObjectId(stockId) })
      .sort({ date: -1 }) // Sort by date descending
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.analystRatingsModel
      .countDocuments({ stock: new Types.ObjectId(stockId) })
      .exec();

    return { ratings, total };
  }

  async findDetailedPaginatedByStockId(
    stockId: string,
    page: number,
    limit: number,
  ): Promise<{ ratings: AnalystRatingsDetailedDocument[]; total: number }> {
    const ratings = await this.analystRatingsDetailedModel
      .find({ stock: new Types.ObjectId(stockId) })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.analystRatingsDetailedModel
      .countDocuments({ stock: new Types.ObjectId(stockId) })
      .exec();

    return { ratings, total };
  }

  async findLatestDetailedByStockId(
    stockId: Types.ObjectId,
  ): Promise<AnalystRatingsDetailedDocument | null> {
    return this.analystRatingsDetailedModel
      .findOne({ stock: stockId })
      .sort({ date: -1 })
      .exec();
  }
}
