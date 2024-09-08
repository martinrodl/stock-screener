import React, { useState, useEffect } from 'react'
import { useStocksControllerGetKeyMetricsQuery } from '../services/beGeneratedApi'

const KeyMetrics = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetKeyMetricsQuery({
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
        return <p>Loading key metrics...</p>
    }

    if (error) {
        return <p>Error loading key metrics: {error.message}</p>
    }

    const metrics = data?.metrics?.metrics || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Key Metrics</h2>
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
                            <td className="py-2 px-4 border-b">Revenue Per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.revenuePerShare !== undefined
                                        ? metric.revenuePerShare.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income Per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.netIncomePerShare !== undefined
                                        ? metric.netIncomePerShare.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Cash Flow Per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.operatingCashFlowPerShare !== undefined
                                        ? metric.operatingCashFlowPerShare.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Free Cash Flow Per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.freeCashFlowPerShare !== undefined
                                        ? metric.freeCashFlowPerShare.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Book Value Per Share</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.bookValuePerShare !== undefined
                                        ? metric.bookValuePerShare.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">PE Ratio</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.peRatio !== undefined ? metric.peRatio.toFixed(2) : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Debt to Equity</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.debtToEquity !== undefined
                                        ? metric.debtToEquity.toFixed(2)
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No key metrics available.</p>
            )}
        </div>
    )
}

export default KeyMetrics
