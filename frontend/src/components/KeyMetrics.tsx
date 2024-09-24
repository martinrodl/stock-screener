import React, { useState, useEffect } from 'react'
import { useStocksControllerGetKeyMetricsQuery } from '../services/beGeneratedApi'

const KeyMetrics = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for pagination
    const limit = 5 // Limit per page

    // Fetch key metrics data with pagination and period type
    const { data, error, isLoading } = useStocksControllerGetKeyMetricsQuery({
        symbol,
        periodType,
        page,
        limit,
    })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNextPage = () => {
        if (page * limit < data?.metrics?.total) setPage(page + 1)
    }

    if (isLoading) {
        return <p>Loading key metrics...</p>
    }

    if (error) {
        return <p>Error loading key metrics: {error.message}</p>
    }

    // Metrics data is now nested inside data.metrics.metrics
    const metrics = data?.metrics?.metrics || []
    const total = data?.metrics?.total || 0

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Key Metrics</h2>
                <div className="flex items-center">
                    {/* Previous Button */}
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                        className={`mr-4 px-4 py-2 rounded bg-blue-500 text-white ${
                            page === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {'<'}
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={handleNextPage}
                        disabled={page * limit >= total}
                        className={`px-4 py-2 rounded bg-blue-500 text-white ${
                            page * limit >= total ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {'>'}
                    </button>

                    <select
                        value={periodType}
                        onChange={(e) => {
                            setPeriodType(e.target.value)
                            setPage(1) // Reset page when periodType changes
                        }}
                        className="border border-gray-300 rounded p-2 ml-4"
                    >
                        <option value="annual">Annual</option>
                        <option value="quarter">Quarterly</option>
                    </select>
                </div>
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
