import React, { useState } from 'react'
import { useStocksControllerGetProfitGrowthMetricsQuery } from '../services/beGeneratedApi'

const ProfitGrowthMetrics = ({ symbol }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetProfitGrowthMetricsQuery({
        symbol,
        periodType,
        page: 1,
        limit: 5,
    })

    if (isLoading) {
        return <p>Loading profit growth metrics...</p>
    }

    if (error) {
        return <p>Error loading profit growth metrics: {error.message}</p>
    }

    const metrics = data?.metrics?.metrics || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Profit Growth Metrics</h2>
                <select
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="annual">Annual</option>
                    <option value="quarter">Quarterly</option>
                </select>
            </div>
            {metrics.length > 0 ? (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Metric</th>
                            {metrics.map((metric) => (
                                <th key={metric._id} className="py-2 px-4 border-b">
                                    {new Date(metric.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthNetIncome !== undefined
                                        ? (metric.growthNetIncome * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">
                                Depreciation & Amortization Growth
                            </td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthDepreciationAndAmortization !== undefined
                                        ? (metric.growthDepreciationAndAmortization * 100).toFixed(
                                              2
                                          ) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Stock-Based Compensation Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthStockBasedCompensation !== undefined
                                        ? (metric.growthStockBasedCompensation * 100).toFixed(2) +
                                          '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Cash Flow Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthOperatingCashFlow !== undefined
                                        ? (metric.growthOperatingCashFlow * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Capital Expenditure Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthCapitalExpenditure !== undefined
                                        ? (metric.growthCapitalExpenditure * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Free Cash Flow Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthFreeCashFlow !== undefined
                                        ? (metric.growthFreeCashFlow * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No profit growth metrics available.</p>
            )}
        </div>
    )
}

export default ProfitGrowthMetrics
