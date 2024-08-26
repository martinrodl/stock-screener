import React, { useState } from 'react'
import { formatPercentage } from '../helpers/formatNumber'
import { useStocksControllerGetGroupMetricsQuery } from '../services/beGeneratedApi'

interface MetricsData {
    calendarYear: string
    quarter?: string
    growthRevenue: number
    growthOperatingIncome: number
    growthNetIncome: number
    growthEPS: number
    growthInventory: number
    growthDividendsPaid: number
    growthFreeCashFlow: number
    revenuePerShare: number
    netIncomePerShare: number
    operatingCashFlowPerShare: number
    freeCashFlowPerShare: number
    cashPerShare: number
    bookValuePerShare: number
    peRatio: number
    debtToAssets: number
    dividendYield: number
    grahamNumber: number
    roic: number
    roe: number
}

const FinancialMetricsViewer: React.FC<{ symbol: string }> = ({ symbol }) => {
    const [periodType, setPeriodType] = useState<'annual' | 'quarterly'>('annual')

    const {
        data: groupMetrics,
        error: groupMetricsError,
        isLoading: groupMetricsLoading,
        refetch: refetchGroupMetrics,
    } = useStocksControllerGetGroupMetricsQuery({
        symbol: symbol,
        periodType: periodType,
        limit: 10,
    })

    const handlePeriodTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriodType(event.target.value as 'annual' | 'quarterly')
        refetchGroupMetrics()
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
            {groupMetricsError && (
                <p className="text-red-500">Error: {groupMetricsError.message}</p>
            )}
            {groupMetricsLoading ? (
                <p>Loading...</p>
            ) : groupMetrics && groupMetrics.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-x-2 divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Metric</th>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <th key={index}>
                                        {periodType === 'quarterly' && item.quarter
                                            ? `${item.calendarYear} ${item.quarter}`
                                            : item.calendarYear}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td>Growth Revenue</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.growthRevenue)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Growth Operating Income</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>
                                        {formatPercentage(item.growthOperatingIncome)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Growth Net Income</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.growthNetIncome)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Growth EPS</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.growthEPS)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Growth Inventory</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.growthInventory)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Growth Dividends Paid</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>
                                        {formatPercentage(item.growthDividendsPaid)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Growth Free Cash Flow</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.growthFreeCashFlow)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Revenue Per Share</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.revenuePerShare.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Net Income Per Share</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.netIncomePerShare.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Operating Cash Flow Per Share</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.operatingCashFlowPerShare.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Free Cash Flow Per Share</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.freeCashFlowPerShare.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Cash Per Share</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.cashPerShare.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Book Value Per Share</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.bookValuePerShare.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>PE Ratio</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.peRatio.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Debt to Assets</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.debtToAssets)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Dividend Yield</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.dividendYield)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Graham Number</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{item.grahamNumber.toFixed(2)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>ROIC</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.roic)}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>ROE</td>
                                {groupMetrics.map((item: MetricsData, index: number) => (
                                    <td key={index}>{formatPercentage(item.roe)}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    )
}

export default FinancialMetricsViewer
