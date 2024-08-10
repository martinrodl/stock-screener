import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  IncomeGrowthMetrics,
  IncomeGrowthMetricDocument,
  ProfitGrowthMetrics,
  ProfitGrowthDocument,
  KeyMetrics,
  KeyMetricsDocument,
} from '../schemas';
import { PeriodType } from '../enums';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectModel(KeyMetrics.name)
    public keyMetricsModel: Model<KeyMetricsDocument>,
    @InjectModel(IncomeGrowthMetrics.name)
    public incomeGrowthMetricsModel: Model<IncomeGrowthMetricDocument>,
    @InjectModel(ProfitGrowthMetrics.name)
    public profitGrowthMetricsModel: Model<ProfitGrowthDocument>,
  ) {}

  public async insertManyIfNotExistsHelper(
    model: Model<any>,
    documents: any[],
  ): Promise<any[]> {
    const insertedDocuments = [];
    for (const doc of documents) {
      const existingDoc = await model
        .findOne({
          date: doc.date,
          period: doc.period,
          stock: doc.stock,
        })
        .exec();
      if (!existingDoc) {
        const newDoc = await model.create(doc);
        insertedDocuments.push(newDoc);
      } else {
        insertedDocuments.push(existingDoc);
      }
    }
    return insertedDocuments;
  }

  async insertManyIfNotExists(
    keyMetrics: KeyMetricsDocument[],
    incomeGrowthMetrics: IncomeGrowthMetricDocument[],
    profitGrowthMetrics: ProfitGrowthDocument[],
  ): Promise<void> {
    await this.insertManyIfNotExistsHelper(this.keyMetricsModel, keyMetrics);
    await this.insertManyIfNotExistsHelper(
      this.incomeGrowthMetricsModel,
      incomeGrowthMetrics,
    );
    await this.insertManyIfNotExistsHelper(
      this.profitGrowthMetricsModel,
      profitGrowthMetrics,
    );
  }

  // findKeyMetrics(filter: any) {
  //   return this.keyMetricsModel.find(filter);
  // }

  // findIncomeGrowthMetrics(filter: any) {
  //   return this.incomeGrowthMetricsModel.find(filter);
  // }

  // findProfitGrowthMetrics(filter: any) {
  //   return this.profitGrowthMetricsModel.find(filter);
  // }

  async findKeyMetrics(
    stockId: Types.ObjectId,
    period: PeriodType = PeriodType.ANNUAL,
    limit = 5,
  ) {
    const periodFilter =
      period === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] };

    return this.keyMetricsModel
      .find({ stock: new Types.ObjectId(stockId), period: periodFilter })
      .sort({ date: -1 }) // Sort by date in descending order
      .limit(limit) // Limit to the specified number of documents
      .exec();
  }

  async findIncomeGrowthMetrics(
    stockId: Types.ObjectId,
    period: PeriodType = PeriodType.ANNUAL,
    limit = 5,
  ) {
    const periodFilter =
      period === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] };

    return this.incomeGrowthMetricsModel
      .find({ stock: new Types.ObjectId(stockId), period: periodFilter })
      .sort({ date: -1 }) // Sort by date in descending order
      .limit(limit) // Limit to the specified number of documents
      .exec();
  }

  async findProfitGrowthMetrics(
    stockId: Types.ObjectId,
    period: PeriodType = PeriodType.ANNUAL,
    limit = 5,
  ) {
    const periodFilter =
      period === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] };

    return this.profitGrowthMetricsModel
      .find({ stock: new Types.ObjectId(stockId), period: periodFilter })
      .sort({ date: -1 }) // Sort by date in descending order
      .limit(limit) // Limit to the specified number of documents
      .exec();
  }
}
