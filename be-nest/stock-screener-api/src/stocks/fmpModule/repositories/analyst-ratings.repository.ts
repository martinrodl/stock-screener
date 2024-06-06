// src/repositories/analyst-ratings.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AnalystRatings,
  AnalystRatingsDocument,
} from '../schemas/analyst-ratings.schema';

@Injectable()
export class AnalystRatingsRepository {
  constructor(
    @InjectModel(AnalystRatings.name)
    private readonly analystRatingsModel: Model<AnalystRatingsDocument>,
  ) {}

  async findAll(): Promise<AnalystRatings[]> {
    return this.analystRatingsModel.find().exec();
  }

  async findByStockId(stockId: string): Promise<AnalystRatings[]> {
    return this.analystRatingsModel
      .find({ stock: new Types.ObjectId(stockId) })
      .exec();
  }

  async create(analystRatings: AnalystRatings): Promise<AnalystRatings> {
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
}
