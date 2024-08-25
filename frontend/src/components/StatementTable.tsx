import React from 'react'
import { formatBigNumber } from '../helpers/formatNumber'

interface FinancialData {
    calendarYear: string
    quarter?: string // Optional field for quarter information
    revenue: number
    grossProfit: number
    costOfRevenue: number
    researchAndDevelopmentExpenses: number
    operatingExpenses: number
    depreciationAndAmortization: number
    operatingIncome: number
    eps?: number // Made optional to handle missing data
    netIncome: number
    operatingCashFlow: number
    inventory: number
    dividendsPaid: number
    cashAtEndOfPeriod: number
    freeCashFlow: number
    totalAssets: number
    totalLiabilities: number
    shortTermDebt: number
    longTermDebt: number
    totalDebt: number
    netDebt: number
}

interface StatementTableProps {
    data: FinancialData[]
    periodType: string
}

const StatementTable: React.FC<StatementTableProps> = ({ data, periodType }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-x-2 divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th>Metric</th>
                        {data.map((item, index) => (
                            <th key={index}>
                                {periodType === 'quarter' && item.quarter
                                    ? `${item.calendarYear} ${item.quarter}`
                                    : item.calendarYear}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td>Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.revenue)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gross Profit</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.grossProfit)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Cost of Revenue</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.costOfRevenue)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>R&D Expenses</td>
                        {data.map((item, index) => (
                            <td key={index}>
                                {formatBigNumber(item.researchAndDevelopmentExpenses)}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Operating Expenses</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.operatingExpenses)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Operating Income</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.operatingIncome)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>EPS</td>
                        {data.map((item, index) => (
                            <td key={index}>{item?.eps?.toFixed(2) ?? 'N/A'}</td> // Optional chaining
                        ))}
                    </tr>
                    <tr>
                        <td>Net Income</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.netIncome)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Operating Cash Flow</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.operatingCashFlow)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.inventory)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Dividends Paid</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.dividendsPaid)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Cash at End of Period</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.cashAtEndOfPeriod)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Free Cash Flow</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.freeCashFlow)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Total Assets</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.totalAssets)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Total Liabilities</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.totalLiabilities)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Total Debt</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.totalDebt)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Net Debt</td>
                        {data.map((item, index) => (
                            <td key={index}>{formatBigNumber(item.netDebt)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatementTable
