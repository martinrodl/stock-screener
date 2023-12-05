import { StockDetail } from '../types/StockDetail'
import { BalanceSheetStatement } from '../types/BalanceSheetStatement'
import { CashflowStatement } from '../types/CashflowStatement'
import { GrowthCashflowMetrics } from '../types/CashflowGrowthMetrics'
import { GrowthIncomeMetrics } from '../types/GrowthIncomeMetrics'
import { IncomeStatement } from '../types/IncomeStatement'
import { KeyMetrics } from '../types/KeyMetrics'

type StatementType = keyof StockDetail
type PropertyType =
    | keyof BalanceSheetStatement
    | keyof CashflowStatement
    | keyof GrowthCashflowMetrics
    | keyof GrowthIncomeMetrics
    | keyof IncomeStatement
    | keyof KeyMetrics

export function getProperties(
    stockDetail: StockDetail,
    statementType: StatementType,
    properties: PropertyType[]
): Array<{ [key: string]: any; date: string }> {
    if (!Object.prototype.hasOwnProperty.call(stockDetail, statementType)) {
        console.error('Invalid statement type.')
        return []
    }

    const statements = stockDetail[statementType]
    if (!Array.isArray(statements)) {
        return []
    }

    const result = statements.map((statement) => {
        const data: { [key: string]: any; date: string } = { date: statement.date } // Initialize with date
        properties.forEach((property) => {
            if (Object.prototype.hasOwnProperty.call(statement, property)) {
                data[property] = statement[property]
            }
        })
        return data
    })

    return result
}

// Example usage:
// const stockDetail: StockDetail = ... // load your JSON data here
// const data = getProperties(stockDetail, "balanceSheetStatements", ["inventory", "cashAndCashEquivalents"]);
// console.log(data);
