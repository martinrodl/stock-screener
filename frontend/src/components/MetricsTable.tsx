import React, { useState } from 'react'
import { useStocksControllerGetGroupMetricsQuery } from '../services/beGeneratedApi'

const GroupMetricsTable = ({ symbol }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetGroupMetricsQuery({
        symbol,
        periodType,
        limit: 5,
    })

    if (isLoading) {
        return <p>Loading group metrics...</p>
    }

    if (error) {
        return <p>Error loading group metrics: {error.message}</p>
    }

    const metrics = data || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Group Financial Metrics</h2>
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
                                <th key={metric.date} className="py-2 px-4 border-b">
                                    {new Date(metric.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">Revenue Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.growthRevenue * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.growthOperatingIncome * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.growthNetIncome * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">EPS Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.growthEPS * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Free Cash Flow Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.growthFreeCashFlow * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">PE Ratio</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {metric.peRatio.toFixed(2)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">ROIC</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.roic * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">ROE</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.roe * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Graham Number</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {metric.grahamNumber.toFixed(2)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Dividend Yield</td>
                            {metrics.map((metric) => (
                                <td key={metric.date} className="py-2 px-4 border-b">
                                    {(metric.dividendYield * 100).toFixed(2)}%
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No group metrics available.</p>
            )}
        </div>
    )
}

export default GroupMetricsTable
