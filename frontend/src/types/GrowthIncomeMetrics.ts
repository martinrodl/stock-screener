export interface GrowthIncomeMetrics {
  date: string;
  symbol: string;
  calendarYear: string;
  period: string;
  growthRevenue: number;
  growthCostOfRevenue: number;
  growthGrossProfit: number;
  growthGrossProfitRatio: number;
  growthResearchAndDevelopmentExpenses: number;
  growthGeneralAndAdministrativeExpenses: number;
  growthSellingAndMarketingExpenses: number;
  growthOtherExpenses: number;
  growthOperatingExpenses: number;
  growthCostAndExpenses: number;
  growthInterestExpense: number;
  growthDepreciationAndAmortization: number;
  growthEBITDA: number;
  growthEBITDARatio: number;
  growthOperatingIncome: number;
  growthOperatingIncomeRatio: number;
  growthTotalOtherIncomeExpensesNet: number;
  growthIncomeBeforeTax: number;
  growthIncomeBeforeTaxRatio: number;
  growthIncomeTaxExpense: number;
  growthNetIncome: number;
  growthNetIncomeRatio: number;
  growthEPS: number;
  growthEPSDiluted: number;
  growthWeightedAverageShsOut: number;
  growthWeightedAverageShsOutDil: number;
  // Add any additional fields you might need
}
