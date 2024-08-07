import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IncomeGrowthMetrics,
  IncomeGrowthMetricDocument,
  ProfitGrowthMetrics,
  ProfitGrowthDocument,
  KeyMetrics,
  KeyMetricsDocument,
} from '../schemas';

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

  findKeyMetrics(filter: any) {
    return this.keyMetricsModel.find(filter);
  }

  findIncomeGrowthMetrics(filter: any) {
    return this.incomeGrowthMetricsModel.find(filter);
  }

  findProfitGrowthMetrics(filter: any) {
    return this.profitGrowthMetricsModel.find(filter);
  }
}
