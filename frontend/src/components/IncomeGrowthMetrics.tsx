import React, { useState, useEffect } from 'react'
import { useStocksControllerGetIncomeGrowthMetricsQuery } from '../services/beGeneratedApi'

const IncomeGrowthMetrics = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetIncomeGrowthMetricsQuery({
        symbol,
        periodType,
        page: 1,
        limit: 5,
    })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

    if (isLoading) {
        return <p>Loading income growth metrics...</p>
    }

    if (error) {
        return <p>Error loading income growth metrics: {error.message}</p>
    }

    const metrics = data?.metrics?.metrics || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Income Growth Metrics</h2>
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
                            <th className="py-2 px-4 border-b">Field</th>
                            {metrics.map((metric) => (
                                <th key={metric._id} className="py-2 px-4 border-b">
                                    {new Date(metric.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">Revenue Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthRevenue !== undefined
                                        ? metric.growthRevenue.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Cost of Revenue Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthCostOfRevenue !== undefined
                                        ? metric.growthCostOfRevenue.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Gross Profit Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthGrossProfit !== undefined
                                        ? metric.growthGrossProfit.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthOperatingIncome !== undefined
                                        ? metric.growthOperatingIncome.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthNetIncome !== undefined
                                        ? metric.growthNetIncome.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">EPS Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthEPS !== undefined
                                        ? metric.growthEPS.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No income growth metrics available.</p>
            )}
        </div>
    )
}

export default IncomeGrowthMetrics
