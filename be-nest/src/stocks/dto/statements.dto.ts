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

  @Expose()
  commonStockRepurchased: number;

  @Expose()
  depreciationAndAmortization: number;

  @Expose()
  deferredIncomeTax: number;

  @Expose()
  stockBasedCompensation: number;

  @Expose()
  changeInWorkingCapital: number;

  @Expose()
  accountsReceivables: number;

  @Expose()
  accountsPayables: number;

  @Expose()
  otherWorkingCapital: number;

  @Expose()
  otherNonCashItems: number;

  @Expose()
  netCashProvidedByOperatingActivities: number;

  @Expose()
  investmentsInPropertyPlantAndEquipment: number;

  @Expose()
  acquisitionsNet: number;

  @Expose()
  purchasesOfInvestments: number;

  @Expose()
  salesMaturitiesOfInvestments: number;

  @Expose()
  otherInvestingActivites: number;

  @Expose()
  netCashUsedForInvestingActivites: number;

  @Expose()
  debtRepayment: number;

  @Expose()
  commonStockIssued: number;

  @Expose()
  otherFinancingActivites: number;

  @Expose()
  netCashUsedProvidedByFinancingActivities: number;

  @Expose()
  effectOfForexChangesOnCash: number;

  @Expose()
  netChangeInCash: number;

  @Expose()
  cashAtBeginningOfPeriod: number;

  @Expose()
  capitalExpenditure: number;

  @Expose()
  FY: string;
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

  @Expose()
  cashAndCashEquivalents: number;

  @Expose()
  shortTermInvestments: number;

  @Expose()
  cashAndShortTermInvestments: number;

  @Expose()
  netReceivables: number;

  @Expose()
  otherCurrentAssets: number;

  @Expose()
  totalCurrentAssets: number;

  @Expose()
  propertyPlantEquipmentNet: number;

  @Expose()
  goodwill: number;

  @Expose()
  intangibleAssets: number;

  @Expose()
  goodwillAndIntangibleAssets: number;

  @Expose()
  longTermInvestments: number;

  @Expose()
  taxAssets: number;

  @Expose()
  otherNonCurrentAssets: number;

  @Expose()
  totalNonCurrentAssets: number;

  @Expose()
  otherAssets: number;

  @Expose()
  accountPayables: number;

  @Expose()
  taxPayables: number;

  @Expose()
  deferredRevenue: number;

  @Expose()
  otherCurrentLiabilities: number;

  @Expose()
  totalCurrentLiabilities: number;

  @Expose()
  deferredRevenueNonCurrent: number;

  @Expose()
  deferredTaxLiabilitiesNonCurrent: number;

  @Expose()
  otherNonCurrentLiabilities: number;

  @Expose()
  otherLiabilities: number;

  @Expose()
  capitalLeaseObligations: number;

  @Expose()
  preferredStock: number;

  @Expose()
  commonStock: number;

  @Expose()
  retainedEarnings: number;

  @Expose()
  accumulatedOtherComprehensiveIncomeLoss: number;

  @Expose()
  othertotalStockholdersEquity: number;

  @Expose()
  totalStockholdersEquity: number;

  @Expose()
  totalEquity: number;

  @Expose()
  totalLiabilitiesAndStockholdersEquity: number;

  @Expose()
  minorityInterest: number;

  @Expose()
  totalLiabilitiesAndTotalEquity: number;

  @Expose()
  totalInvestments: number;

  @Expose()
  FY: string;
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

  @Expose()
  grossProfitRatio: number;

  @Expose()
  generalAndAdministrativeExpenses: number;

  @Expose()
  sellingGeneralAndAdministrativeExpenses: number;

  @Expose()
  otherExpenses: number;

  @Expose()
  costAndExpenses: number;

  @Expose()
  interestIncome: number;

  @Expose()
  interestExpense: number;

  @Expose()
  ebitda: number;

  @Expose()
  ebitdaratio: number;

  @Expose()
  operatingIncomeRatio: number;

  @Expose()
  totalOtherIncomeExpensesNet: number;

  @Expose()
  incomeBeforeTax: number;

  @Expose()
  incomeBeforeTaxRatio: number;

  @Expose()
  incomeTaxExpense: number;

  @Expose()
  netIncome: number;

  @Expose()
  netIncomeRatio: number;

  @Expose()
  epsdiluted: number;

  @Expose()
  weightedAverageShsOut: number;

  @Expose()
  weightedAverageShsOutDil: number;

  @Expose()
  FY: string;
}

export class CombinedStatementDto {
  @Expose()
  date: string;

  @Expose()
  calendarYear: string;

  @Expose()
  period: string;

  @Expose()
  eps: number;

  @Expose()
  revenue: number;

  @Expose()
  grossProfit: number;

  @Expose()
  netIncome: number;

  @Expose()
  operatingIncome: number;

  @Expose()
  freeCashFlow: number;

  @Expose()
  costOfRevenue: number;

  @Expose()
  operatingCashFlow: number;

  @Expose()
  researchAndDevelopmentExpenses: number;

  @Expose()
  sellingAndMarketingExpenses: number;

  @Expose()
  operatingExpenses: number;

  @Expose()
  depreciationAndAmortization: number;

  @Expose()
  inventory: number;

  @Expose()
  cashAtEndOfPeriod: number;

  @Expose()
  dividendsPaid: number;

  @Expose()
  commonStockRepurchased: number;

  @Expose()
  totalAssets: number;

  @Expose()
  totalLiabilities: number;

  @Expose()
  totalDebt: number;

  @Expose()
  netDebt: number;

  @Expose()
  longTermDebt: number;

  @Expose()
  shortTermDebt: number;
}
