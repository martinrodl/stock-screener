import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';

import { StatementsRepository } from '../repositories/statements.repository';
import { StocksService } from './stocks.service';
import { StockDocument } from '../schemas/stock.schema';
import {
  CombinedData,
  CombinedStatement,
} from '../interfaces/combined-data.interface';
import { PeriodType } from '../enums';
import {
  BalanceSheetStatementDto,
  CashFlowStatementDto,
  IncomeStatementDto,
  CombinedStatementDto,
} from '../dto';
import { mergeObjSameDate } from '../utils';

@Injectable()
export class StatementsService {
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly statementsRepository: StatementsRepository,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => StocksService))
    private stocksService: StocksService,
  ) {}

  async fetchStatements(symbol: string) {
    const quarterlyCashFlowUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?period=quarter&limit=20&apikey=${this.apiKey}`;
    const yearlyCashFlowUrl = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?period=year&limit=20&apikey=${this.apiKey}`;
    const quarterlyBalanceSheetUrl = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?period=quarter&limit=20&apikey=${this.apiKey}`;
    const yearlyBalanceSheetUrl = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?period=year&limit=20&apikey=${this.apiKey}`;
    const quarterlyIncomeStatementUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=quarter&limit=20&apikey=${this.apiKey}`;
    const yearlyIncomeStatementUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=year&limit=20&apikey=${this.apiKey}`;

    const [
      quarterlyCashFlow,
      yearlyCashFlow,
      quarterlyBalanceSheet,
      yearlyBalanceSheet,
      quarterlyIncomeStatement,
      yearlyIncomeStatement,
    ] = await Promise.all([
      firstValueFrom(this.httpService.get(quarterlyCashFlowUrl)),
      firstValueFrom(this.httpService.get(yearlyCashFlowUrl)),
      firstValueFrom(this.httpService.get(quarterlyBalanceSheetUrl)),
      firstValueFrom(this.httpService.get(yearlyBalanceSheetUrl)),
      firstValueFrom(this.httpService.get(quarterlyIncomeStatementUrl)),
      firstValueFrom(this.httpService.get(yearlyIncomeStatementUrl)),
    ]);

    return {
      quarterlyCashFlow: quarterlyCashFlow.data,
      yearlyCashFlow: yearlyCashFlow.data,
      quarterlyBalanceSheet: quarterlyBalanceSheet.data,
      yearlyBalanceSheet: yearlyBalanceSheet.data,
      quarterlyIncomeStatement: quarterlyIncomeStatement.data,
      yearlyIncomeStatement: yearlyIncomeStatement.data,
    };
  }

  async saveStatements(symbol: string) {
    const statements = await this.fetchStatements(symbol);
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;

    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const lastAnnualCashFlowStatement = statements.yearlyCashFlow[0];
    const lastAnnualBalanceSheetStatement = statements.yearlyBalanceSheet[0];
    const lastAnnualIncomeStatement = statements.yearlyIncomeStatement[0];

    // Update the stock document with the last annual statements
    stock.lastAnnualCashFlowStatement = lastAnnualCashFlowStatement || null;
    stock.lastAnnualBalanceSheetStatement =
      lastAnnualBalanceSheetStatement || null;
    stock.lastAnnualIncomeStatement = lastAnnualIncomeStatement || null;

    await stock.save();

    const cashFlowStatements = [
      ...statements.quarterlyCashFlow,
      ...statements.yearlyCashFlow,
    ].map((statement) => ({
      ...statement,
      stock: (stock as StockDocument)._id,
    }));

    const balanceSheetStatements = [
      ...statements.quarterlyBalanceSheet,
      ...statements.yearlyBalanceSheet,
    ].map((statement) => ({
      ...statement,
      stock: (stock as StockDocument)._id,
    }));

    const incomeStatements = [
      ...statements.quarterlyIncomeStatement,
      ...statements.yearlyIncomeStatement,
    ].map((statement) => ({
      ...statement,
      stock: (stock as StockDocument)._id,
    }));

    await this.statementsRepository.insertManyIfNotExists(
      cashFlowStatements,
      balanceSheetStatements,
      incomeStatements,
    );
  }

  async getCombinedData(
    symbol: string,
    periodType: PeriodType = PeriodType.ANNUAL,
    properties: string[],
  ) {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const cashFlowStatements =
      await this.statementsRepository.findCashFlowStatements(
        stock.id,
        periodType,
      );
    const balanceSheetStatements =
      await this.statementsRepository.findBalanceSheetStatements(
        stock.id,
        periodType,
      );
    const incomeStatements =
      await this.statementsRepository.findIncomeStatements(
        stock.id,
        periodType,
      );

    const combinedData: { [key: string]: CombinedData } = {};

    const combineStatements = (statements) => {
      statements.forEach((statement) => {
        const key = `${statement.date}-${statement.period}`;
        if (!combinedData[key])
          combinedData[key] = {
            date: statement.date,
            period: statement.period,
          };
        properties.forEach((prop) => {
          if (statement[prop] !== undefined)
            combinedData[key][prop] = statement[prop];
        });
      });
    };

    combineStatements(cashFlowStatements);
    combineStatements(balanceSheetStatements);
    combineStatements(incomeStatements);

    const sortedData = Object.values(combinedData).sort((a, b) => {
      // Sort by date first
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison !== 0) return dateComparison;
      // If dates are the same, sort by period
      const periodOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4, FY: 5 };
      return periodOrder[b.period] - periodOrder[a.period];
    });

    return sortedData;
  }

  private filterProperties(
    data: any[],
    properties: string[],
    type: string,
  ): any[] {
    if (properties.length === 0) return data;
    return data.map((item) => {
      const filteredItem = {};
      properties.forEach((prop) => {
        const [propType, propName] = prop.split('.');
        if (propType === type && item.hasOwnProperty(propName)) {
          filteredItem[propName] = item[propName];
        }
      });
      return filteredItem;
    });
  }

  public async getStatements(symbol: string, periodType: PeriodType) {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const cashFlowStatements =
      await this.statementsRepository.findCashFlowStatements(
        stock.id,
        periodType,
      );
    const balanceSheetStatements =
      await this.statementsRepository.findBalanceSheetStatements(
        stock.id,
        periodType,
      );
    const incomeStatements =
      await this.statementsRepository.findIncomeStatements(
        stock.id,
        periodType,
      );

    return {
      cashFlowStatements: plainToClass(
        CashFlowStatementDto,
        cashFlowStatements,
        { excludeExtraneousValues: true },
      ),
      balanceSheetStatements: plainToClass(
        BalanceSheetStatementDto,
        balanceSheetStatements,
        { excludeExtraneousValues: true },
      ),
      incomeStatements: plainToClass(IncomeStatementDto, incomeStatements, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async getGroupStatements(
    symbol: string,
    periodType: PeriodType,
  ): Promise<CombinedStatement[]> {
    const stock = (await this.stocksService.getStock(symbol)) as StockDocument;
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const cashFlowStatements =
      await this.statementsRepository.findCashFlowStatements(
        stock.id,
        periodType,
      );

    const balanceSheetStatements =
      await this.statementsRepository.findBalanceSheetStatements(
        stock.id,
        periodType,
      );
    const incomeStatements =
      await this.statementsRepository.findIncomeStatements(
        stock.id,
        periodType,
      );

    const filteredCashFlowStatements = plainToClass(
      CashFlowStatementDto,
      cashFlowStatements,
      { excludeExtraneousValues: true },
    );

    const filteredBalanceSheetStatements = plainToClass(
      BalanceSheetStatementDto,
      balanceSheetStatements,
      { excludeExtraneousValues: true },
    );

    const filteredIncomeStatements = plainToClass(
      IncomeStatementDto,
      incomeStatements,
      {
        excludeExtraneousValues: true,
      },
    );

    const mergedStatements = this.mergeStatements(
      filteredCashFlowStatements,
      filteredBalanceSheetStatements,
      filteredIncomeStatements,
    );

    return plainToClass(CombinedStatementDto, mergedStatements, {
      excludeExtraneousValues: true,
    }).slice(0, 10);
  }

  private mergeStatements(
    cashFlowStatements: CashFlowStatementDto[],
    balanceSheetStatements: BalanceSheetStatementDto[],
    incomeStatements: IncomeStatementDto[],
  ): any[] {
    const merged = {};

    const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

    const addToMerged = (array) => {
      array.forEach((item) => {
        const key = `${item.date}-${item.period}`;
        if (merged[key]) {
          merged[key] = mergeObjects(merged[key], item);
        } else {
          merged[key] = { ...item };
        }
      });
    };

    addToMerged(cashFlowStatements);
    addToMerged(balanceSheetStatements);
    addToMerged(incomeStatements);

    return Object.values(merged).slice(0, 10);
  }
}
