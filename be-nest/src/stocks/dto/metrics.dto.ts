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
  growthCostOfRevenue: number;

  @Expose()
  growthGrossProfit: number;

  @Expose()
  growthGrossProfitRatio: number;

  @Expose()
  growthResearchAndDevelopmentExpenses: number;

  @Expose()
  growthGeneralAndAdministrativeExpenses: number;

  @Expose()
  growthSellingAndMarketingExpenses: number;

  @Expose()
  growthOtherExpenses: number;

  @Expose()
  growthOperatingExpenses: number;

  @Expose()
  growthCostAndExpenses: number;

  @Expose()
  growthInterestExpense: number;

  @Expose()
  growthDepreciationAndAmortization: number;

  @Expose()
  growthEBITDA: number;

  @Expose()
  growthEBITDARatio: number;

  @Expose()
  growthOperatingIncome: number;

  @Expose()
  growthOperatingIncomeRatio: number;

  @Expose()
  growthTotalOtherIncomeExpensesNet: number;

  @Expose()
  growthIncomeBeforeTax: number;

  @Expose()
  growthIncomeBeforeTaxRatio: number;

  @Expose()
  growthIncomeTaxExpense: number;

  @Expose()
  growthNetIncome: number;

  @Expose()
  growthNetIncomeRatio: number;

  @Expose()
  growthEPS: number;

  @Expose()
  growthEPSDiluted: number;

  @Expose()
  growthWeightedAverageShsOut: number;

  @Expose()
  growthWeightedAverageShsOutDil: number;
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
  growthDepreciationAndAmortization: number;

  @Expose()
  growthDeferredIncomeTax: number;

  @Expose()
  growthStockBasedCompensation: number;

  @Expose()
  growthChangeInWorkingCapital: number;

  @Expose()
  growthAccountsReceivables: number;

  @Expose()
  growthInventory: number;

  @Expose()
  growthAccountsPayables: number;

  @Expose()
  growthOtherWorkingCapital: number;

  @Expose()
  growthOtherNonCashItems: number;

  @Expose()
  growthNetCashProvidedByOperatingActivities: number;

  @Expose()
  growthInvestmentsInPropertyPlantAndEquipment: number;

  @Expose()
  growthAcquisitionsNet: number;

  @Expose()
  growthPurchasesOfInvestments: number;

  @Expose()
  growthSalesMaturitiesOfInvestments: number;

  @Expose()
  growthOtherInvestingActivities: number;

  @Expose()
  growthNetCashUsedForInvestingActivities: number;

  @Expose()
  growthDebtRepayment: number;

  @Expose()
  growthCommonStockIssued: number;

  @Expose()
  growthCommonStockRepurchased: number;

  @Expose()
  growthDividendsPaid: number;

  @Expose()
  growthOtherFinancingActivities: number;

  @Expose()
  growthNetCashUsedProvidedByFinancingActivities: number;

  @Expose()
  growthEffectOfForexChangesOnCash: number;

  @Expose()
  growthNetChangeInCash: number;

  @Expose()
  growthCashAtEndOfPeriod: number;

  @Expose()
  growthCashAtBeginningOfPeriod: number;

  @Expose()
  growthOperatingCashFlow: number;

  @Expose()
  growthCapitalExpenditure: number;

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
  tangibleBookValuePerShare: number;

  @Expose()
  shareholdersEquityPerShare: number;

  @Expose()
  interestDebtPerShare: number;

  @Expose()
  marketCap: number;

  @Expose()
  enterpriseValue: number;

  @Expose()
  peRatio: number;

  @Expose()
  priceToSalesRatio: number;

  @Expose()
  pocfratio: number;

  @Expose()
  pfcfRatio: number;

  @Expose()
  pbRatio: number;

  @Expose()
  ptbRatio: number;

  @Expose()
  evToSales: number;

  @Expose()
  enterpriseValueOverEBITDA: number;

  @Expose()
  evToOperatingCashFlow: number;

  @Expose()
  evToFreeCashFlow: number;

  @Expose()
  earningsYield: number;

  @Expose()
  freeCashFlowYield: number;

  @Expose()
  debtToEquity: number;

  @Expose()
  debtToAssets: number;

  @Expose()
  netDebtToEBITDA: number;

  @Expose()
  currentRatio: number;

  @Expose()
  interestCoverage: number;

  @Expose()
  incomeQuality: number;

  @Expose()
  dividendYield: number;

  @Expose()
  payoutRatio: number;

  @Expose()
  salesGeneralAndAdministrativeToRevenue: number;

  @Expose()
  researchAndDdevelopementToRevenue: number;

  @Expose()
  intangiblesToTotalAssets: number;

  @Expose()
  capexToOperatingCashFlow: number;

  @Expose()
  capexToRevenue: number;

  @Expose()
  capexToDepreciation: number;

  @Expose()
  stockBasedCompensationToRevenue: number;

  @Expose()
  grahamNumber: number;

  @Expose()
  roic: number;

  @Expose()
  returnOnTangibleAssets: number;

  @Expose()
  grahamNetNet: number;

  @Expose()
  workingCapital: number;

  @Expose()
  tangibleAssetValue: number;

  @Expose()
  netCurrentAssetValue: number;

  @Expose()
  investedCapital: number;

  @Expose()
  averageReceivables: number;

  @Expose()
  averagePayables: number;

  @Expose()
  averageInventory: number;

  @Expose()
  daysSalesOutstanding: number;

  @Expose()
  daysPayablesOutstanding: number;

  @Expose()
  daysOfInventoryOnHand: number;

  @Expose()
  receivablesTurnover: number;

  @Expose()
  payablesTurnover: number;

  @Expose()
  inventoryTurnover: number;

  @Expose()
  roe: number;

  @Expose()
  capexPerShare: number;
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
