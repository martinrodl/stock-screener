import { BalanceSheetStatement } from './BalanceSheetStatement'
import { CashflowStatement } from './CashflowStatement'
import { GrowthCashflowMetrics } from './CashflowGrowthMetrics'
import { GrowthIncomeMetrics } from './GrowthIncomeMetrics'
import { IncomeStatement } from './IncomeStatement'
import { KeyMetrics } from './KeyMetrics'
import { Values } from './Values'
export interface StockDetail {
    _id: string
    symbol: string
    name: string
    exchange: string
    balanceSheetStatements: BalanceSheetStatement[]
    cashflowStatements: CashflowStatement[]
    growthCashflowtMetrics: GrowthCashflowMetrics[]
    growthIncomeMetrics: GrowthIncomeMetrics[]
    incomeStatements: IncomeStatement[]
    keyMetrics: KeyMetrics[]
    lastUpdateAt: string
    values: Values
    outlookData: {
        description: string
        industry: string
        country: string
        sector: string
    }
}

// Define other interfaces similarly with all their respective fields
