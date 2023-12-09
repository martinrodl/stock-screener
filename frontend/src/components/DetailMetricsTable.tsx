import React from 'react'
import { StockDetail } from '../types/StockDetail'
import { IncomeStatement } from '../types/IncomeStatement'
import { KeyMetrics } from '../types/KeyMetrics'
import { formatBigNumber } from '../helpers/formatNumber'

type DetailedMetricsTableProps = {
    stockDetail: StockDetail
}

const DetailedMetricsTable: React.FC<DetailedMetricsTableProps> = ({ stockDetail }) => {
    const findKeyMetrics = (incomeStatement: IncomeStatement): KeyMetrics | undefined => {
        return stockDetail.keyMetrics.find((km) => km.date === incomeStatement.date)
    }

    return (
        <div className="flex flex-col">
            <div className="flex mb-2">
                <div className="flex-1 font-bold w-32 text-center">Date</div>
                <div className="flex-1 font-bold w-32 text-center">Net Income</div>
                <div className="flex-1 font-bold w-32 text-center">Revenue</div>
                <div className="flex-1 font-bold w-32 text-center">Debt</div>
                <div className="flex-1 font-bold w-32 text-center">Dividend Yield</div>
                <div className="flex-1 font-bold w-32 text-center">Payout ratio</div>
                <div className="flex-1 font-bold w-32 text-center">Profit Margin</div>
            </div>
            {stockDetail.incomeStatements.map((incomeStatement, index) => {
                const keyMetrics = findKeyMetrics(incomeStatement)
                const totalDebt =
                    stockDetail.balanceSheetStatements[index]?.shortTermDebt +
                    stockDetail.balanceSheetStatements[index]?.longTermDebt

                return (
                    <div key={index} className="flex">
                        <div className="flex-1 w-32 text-center">
                            {new Date(incomeStatement?.date).toLocaleDateString()}
                        </div>
                        <div className="flex-1 w-32 text-center">
                            {formatBigNumber(incomeStatement?.netIncome)}
                        </div>
                        <div className="flex-1 w-32 text-center">
                            {formatBigNumber(incomeStatement?.revenue)}
                        </div>
                        <div className="flex-1 w-32 text-center">{formatBigNumber(totalDebt)}</div>
                        <div className="flex-1 w-32 text-center">
                            {(Number(keyMetrics?.dividendYield) * 100).toFixed(2)}%
                        </div>
                        <div className="flex-1 w-32 text-center">
                            {(Number(keyMetrics?.payoutRatio) * 100).toFixed(2)}%
                        </div>
                        <div className="flex-1 w-32 text-center">
                            {(incomeStatement?.netIncome / incomeStatement?.revenue).toFixed(3)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DetailedMetricsTable
