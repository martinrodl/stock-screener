import React, { useState } from 'react'
import { formatBigNumber } from '../helpers/formatNumber'
import { useStocksControllerGetGroupStatementsQuery } from '../services/beGeneratedApi'

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
    eps: number
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

interface FinancialStatementViewerProps {
    symbol: string
}

const FinancialStatementViewer: React.FC<FinancialStatementViewerProps> = ({ symbol }) => {
    const [periodType, setPeriodType] = useState<'annual' | 'quarterly'>('annual')

    const {
        data: groupStatements,
        error: groupStatementsError,
        isLoading: groupStatementsLoading,
        refetch: refetchGroupStatements,
    } = useStocksControllerGetGroupStatementsQuery({
        symbol: symbol,
        periodType: periodType,
        limit: 10, // Pass the limit here to ensure it’s included in the query
    })

    const handlePeriodTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriodType(event.target.value as 'annual' | 'quarterly')
        refetchGroupStatements()
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="period-type-selector" className="mr-2 font-medium">
                    Select Period:
                </label>
                <select
                    id="period-type-selector"
                    value={periodType}
                    onChange={handlePeriodTypeChange}
                    className="p-2 border rounded-md"
                >
                    <option value="annual">Annual</option>
                    <option value="quarterly">Quarterly</option>
                </select>
            </div>
            {groupStatementsError && (
                <p className="text-red-500">Error: {groupStatementsError.message}</p>
            )}
            {groupStatementsLoading ? (
                <p>Loading...</p>
            ) : groupStatements && groupStatements.length > 0 ? (
                <StatementTable data={groupStatements} periodType={periodType} />
            ) : (
                <p>No data available.</p>
            )}
        </div>
    )
}

export default FinancialStatementViewer
