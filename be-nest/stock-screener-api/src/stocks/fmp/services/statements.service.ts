import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { StatementsRepository } from '../repositories/statements.repository';
import { StocksService } from '../../stocks.service';
import { StockDocument } from '../../schemas/stock.schema';
import { CombinedData } from '../interfaces/combined-data.interface';

@Injectable()
export class StatementsService {
  private readonly apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

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
    const stock = await this.stocksService.getStock(symbol);

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
    periodType: string,
    properties: string[],
  ) {
    const stock = await this.stocksService.getStock(symbol);
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }

    const filter =
      periodType === 'annual'
        ? { stock: (stock as StockDocument)._id, period: 'FY' }
        : {
            stock: (stock as StockDocument)._id,
            period: { $in: ['Q1', 'Q2', 'Q3', 'Q4'] },
          };

    const cashFlowStatements =
      await this.statementsRepository.findCashFlowStatements(filter);
    const balanceSheetStatements =
      await this.statementsRepository.findBalanceSheetStatements(filter);
    const incomeStatements =
      await this.statementsRepository.findIncomeStatements(filter);

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
}
