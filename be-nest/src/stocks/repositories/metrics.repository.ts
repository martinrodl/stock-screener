import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  KeyMetrics,
  KeyMetricsDocument,
  IncomeGrowthMetrics,
  IncomeGrowthMetricDocument,
  ProfitGrowthMetrics,
  ProfitGrowthDocument,
} from '../schemas';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectModel(KeyMetrics.name)
    private keyMetricsModel: Model<KeyMetricsDocument>,
    @InjectModel(IncomeGrowthMetrics.name)
    private incomeGrowthMetricsModel: Model<IncomeGrowthMetricDocument>,
    @InjectModel(ProfitGrowthMetrics.name)
    private profitGrowthMetricsModel: Model<ProfitGrowthDocument>,
  ) {}

  private async insertManyIfNotExistsHelper(
    model: Model<any>,
    documents: any[],
  ): Promise<void> {
    for (const doc of documents) {
      const existingDoc = await model
        .findOne({
          date: doc.date,
          period: doc.period,
        })
        .exec();
      if (!existingDoc) {
        await model.create(doc);
      }
    }
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

  async findKeyMetrics(filter: any): Promise<KeyMetrics[]> {
    return this.keyMetricsModel.find(filter).exec();
  }

  async findIncomeGrowthMetrics(filter: any): Promise<IncomeGrowthMetrics[]> {
    return this.incomeGrowthMetricsModel.find(filter).exec();
  }

  async findProfitGrowthMetrics(filter: any): Promise<ProfitGrowthMetrics[]> {
    return this.profitGrowthMetricsModel.find(filter).exec();
  }
}
