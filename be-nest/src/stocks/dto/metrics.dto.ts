import { Exclude, Expose } from 'class-transformer';

export class IncomeGrowthMetricDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  growthRevenue: number;

  @Expose()
  growthOperatingIncome: number;

  @Expose()
  growthNetIncome: number;

  @Expose()
  growthEPS: number;
}

export class ProfitGrowthMetricDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  growthNetIncome: number;

  @Expose()
  growthInventory: number;

  @Expose()
  growthDividendsPaid: number;

  @Expose()
  growthFreeCashFlow: number;
}

export class KeyMetricDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  revenuePerShare: number;

  @Expose()
  netIncomePerShare: number;

  @Expose()
  operatingCashFlowPerShare: number;

  @Expose()
  freeCashFlowPerShare: number;

  @Expose()
  cashPerShare: number;

  @Expose()
  bookValuePerShare: number;

  @Expose()
  peRatio: number;

  @Expose()
  debtToAssets: number;

  @Expose()
  dividendYield: number;

  @Expose()
  grahamNumber: number;

  @Expose()
  roic: number;

  @Expose()
  roe: number;
}

export class CombinedMetricsDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  growthRevenue: number;

  @Expose()
  growthOperatingIncome: number;

  @Expose()
  growthNetIncome: number;

  @Expose()
  growthEPS: number;

  @Expose()
  growthInventory: number;

  @Expose()
  growthDividendsPaid: number;

  @Expose()
  growthFreeCashFlow: number;

  @Expose()
  revenuePerShare: number;

  @Expose()
  netIncomePerShare: number;

  @Expose()
  operatingCashFlowPerShare: number;

  @Expose()
  freeCashFlowPerShare: number;

  @Expose()
  cashPerShare: number;

  @Expose()
  bookValuePerShare: number;

  @Expose()
  peRatio: number;

  @Expose()
  debtToAssets: number;

  @Expose()
  dividendYield: number;

  @Expose()
  grahamNumber: number;

  @Expose()
  roic: number;

  @Expose()
  roe: number;
}
