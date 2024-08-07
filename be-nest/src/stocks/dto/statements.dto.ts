import { Exclude, Expose } from 'class-transformer';

export class CashFlowStatementDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  netIncome: number;

  @Expose()
  operatingCashFlow: number;

  @Expose()
  inventory: number;

  @Expose()
  dividendsPaid: number;

  @Expose()
  cashAtEndOfPeriod: number;

  @Expose()
  freeCashFlow: number;
}

export class BalanceSheetStatementDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  totalAssets: number;

  @Expose()
  totalLiabilities: number;

  @Expose()
  inventory: number;

  @Expose()
  shortTermDebt: number;

  @Expose()
  longTermDebt: number;

  @Expose()
  totalDebt: number;

  @Expose()
  netDebt: number;
}

export class IncomeStatementDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  revenue: number;

  @Expose()
  grossProfit: number;

  @Expose()
  costOfRevenue: number;

  @Expose()
  researchAndDevelopmentExpenses: number;

  @Expose()
  sellingAndMarketingExpenses: number;

  @Expose()
  operatingExpenses: number;

  @Expose()
  depreciationAndAmortization: number;

  @Expose()
  operatingIncome: number;

  @Expose()
  eps: number;
}

export class CombinedStatementDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  revenue: number;

  @Expose()
  grossProfit: number;

  @Expose()
  costOfRevenue: number;

  @Expose()
  researchAndDevelopmentExpenses: number;

  @Expose()
  sellingAndMarketingExpenses: number;

  @Expose()
  operatingExpenses: number;

  @Expose()
  depreciationAndAmortization: number;

  @Expose()
  operatingIncome: number;

  @Expose()
  eps: number;

  @Expose()
  netIncome: number;

  @Expose()
  operatingCashFlow: number;

  @Expose()
  inventory: number;

  @Expose()
  dividendsPaid: number;

  @Expose()
  cashAtEndOfPeriod: number;

  @Expose()
  freeCashFlow: number;

  @Expose()
  totalAssets: number;

  @Expose()
  totalLiabilities: number;

  @Expose()
  shortTermDebt: number;

  @Expose()
  longTermDebt: number;

  @Expose()
  totalDebt: number;

  @Expose()
  netDebt: number;
}
