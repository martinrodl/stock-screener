import { BalanceSheetStatement } from "./BalanceSheetStatement";
import { CashflowStatement } from "./CashflowStatement";
import { GrowthCashflowMetrics } from "./CashflowGrowthMetrics";
import { GrowthIncomeMetrics } from "./GrowthIncomeMetrics";
import { IncomeStatement } from "./IncomeStatement";
import { KeyMetrics } from "./KeyMetrics";

export interface StockDetail {
  _id: string;
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  balanceSheetStatements: BalanceSheetStatement[];
  cashflowStatements: CashflowStatement[];
  growthCashflowtMetrics: GrowthCashflowMetrics[];
  growthIncomeMetrics: GrowthIncomeMetrics[];
  incomeStatements: IncomeStatement[];
  keyMetrics: KeyMetrics[];
  lastUpdateAt: string;
  marketCap: number;
  peRatio: number;
}

// Define other interfaces similarly with all their respective fields
