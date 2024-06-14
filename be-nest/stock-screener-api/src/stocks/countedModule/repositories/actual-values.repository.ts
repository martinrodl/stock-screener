// src/stocks/counted/repositories/actual-values.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ActualValues,
  ActualValuesDocument,
} from '../schemas/actual-values.schema';

@Injectable()
export class ActualValuesRepository {
  constructor(
    @InjectModel(ActualValues.name)
    private readonly actualValuesModel: Model<ActualValuesDocument>,
  ) {}

  async updateValues(
    stockId: string,
    values: Partial<ActualValues>,
  ): Promise<ActualValuesDocument> {
    return this.actualValuesModel
      .findOneAndUpdate(
        { stock: stockId },
        { $set: values },
        { new: true, upsert: true },
      )
      .exec();
  }
}
