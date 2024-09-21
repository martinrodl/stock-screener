import React, { useState, useEffect } from 'react'
import { useStocksControllerGetGroupMetricsQuery } from '../services/beGeneratedApi'

const GroupMetricsTable = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetGroupMetricsQuery({
        symbol,
        periodType,
        limit: 7,
    })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

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
                                <th key={metric?.date} className="py-2 px-4 border-b">
                                    {new Date(metric?.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">Revenue per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.revenuePerShare?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.netIncomePerShare?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Cash Flow per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.operatingCashFlowPerShare?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Free Cash Flow per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.freeCashFlowPerShare?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Cash per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.cashPerShare?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Book Value per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.bookValuePerShare?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">PE Ratio</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.peRatio?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Debt to Assets</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {(metric?.debtToAssets * 100)?.toFixed(2) || 'N/A'}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Dividend Yield</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {(metric?.dividendYield * 100)?.toFixed(2) || 'N/A'}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Graham Number</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {metric?.grahamNumber?.toFixed(2) || 'N/A'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">ROIC</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {(metric?.roic * 100)?.toFixed(2) || 'N/A'}%
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">ROE</td>
                            {metrics.map((metric) => (
                                <td key={metric?.date} className="py-2 px-4 border-b">
                                    {(metric?.roe * 100)?.toFixed(2) || 'N/A'}%
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
