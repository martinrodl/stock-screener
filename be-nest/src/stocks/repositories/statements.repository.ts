import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CashFlowStatement,
  CashFlowStatementDocument,
} from '../schemas/cash-flow-statement.schema';
import {
  BalanceSheetStatement,
  BalanceSheetStatementDocument,
} from '../schemas/balance-sheet-statement.schema';
import {
  IncomeStatement,
  IncomeStatementDocument,
} from '../schemas/income-statement.schema';
import { PeriodType } from '../enums';

@Injectable()
export class StatementsRepository {
  constructor(
    @InjectModel(CashFlowStatement.name)
    private cashFlowStatementModel: Model<CashFlowStatementDocument>,
    @InjectModel(BalanceSheetStatement.name)
    private balanceSheetStatementModel: Model<BalanceSheetStatementDocument>,
    @InjectModel(IncomeStatement.name)
    private incomeStatementModel: Model<IncomeStatementDocument>,
  ) {}

  private async insertManyIfNotExistsHelper(
    model: Model<any>,
    documents: any[],
  ): Promise<void> {
    for (const doc of documents) {
      const existingDoc = await model
        .findOne({
          stock: doc.stock,
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
    cashFlowStatements: CashFlowStatementDocument[],
    balanceSheetStatements: BalanceSheetStatementDocument[],
    incomeStatements: IncomeStatementDocument[],
  ): Promise<void> {
    await this.insertManyIfNotExistsHelper(
      this.cashFlowStatementModel,
      cashFlowStatements,
    );
    await this.insertManyIfNotExistsHelper(
      this.balanceSheetStatementModel,
      balanceSheetStatements,
    );
    await this.insertManyIfNotExistsHelper(
      this.incomeStatementModel,
      incomeStatements,
    );
  }

  // async findCashFlowStatements(filter: any): Promise<CashFlowStatement[]> {
  //   return this.cashFlowStatementModel.find(filter).exec();
  // }

  // async findBalanceSheetStatements(
  //   filter: any,
  // ): Promise<BalanceSheetStatement[]> {
  //   return this.balanceSheetStatementModel.find(filter).exec();
  // }

  // async findIncomeStatements(filter: any): Promise<IncomeStatement[]> {
  //   return this.incomeStatementModel.find(filter).exec();
  // }

  async findCashFlowStatements(
    stockId: Types.ObjectId,
    period: PeriodType = PeriodType.ANNUAL,
  ): Promise<CashFlowStatement[]> {
    const periodFilter =
      period === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] };

    return this.cashFlowStatementModel
      .find({ stock: new Types.ObjectId(stockId), period: periodFilter })
      .sort({ date: -1 }) // Sort by date in descending order
      .exec();
  }

  async findBalanceSheetStatements(
    stockId: Types.ObjectId,
    period: PeriodType = PeriodType.ANNUAL,
  ): Promise<BalanceSheetStatement[]> {
    const periodFilter =
      period === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] };

    return this.balanceSheetStatementModel
      .find({ stock: new Types.ObjectId(stockId), period: periodFilter })
      .sort({ date: -1 }) // Sort by date in descending order
      .exec();
  }

  async findIncomeStatements(
    stockId: Types.ObjectId,
    period: PeriodType = PeriodType.ANNUAL,
  ): Promise<IncomeStatement[]> {
    const periodFilter =
      period === 'annual' ? 'FY' : { $in: ['Q1', 'Q2', 'Q3', 'Q4'] };

    return this.incomeStatementModel
      .find({ stock: new Types.ObjectId(stockId), period: periodFilter })
      .sort({ date: -1 }) // Sort by date in descending order
      .exec();
  }
}
