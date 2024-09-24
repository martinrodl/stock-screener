import React, { useState, useEffect } from 'react'
import { useStocksControllerGetGroupMetricsQuery } from '../services/beGeneratedApi'

const GroupMetricsTable = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for pagination
    const limit = 7 // Limit per page

    const { data, error, isLoading } = useStocksControllerGetGroupMetricsQuery({
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
        if (page * limit < data?.total) setPage(page + 1)
    }

    if (isLoading) {
        return <p>Loading group metrics...</p>
    }

    if (error) {
        return <p>Error loading group metrics: {error.message}</p>
    }

    const metrics = data?.metrics || []
    const total = data?.total || 0

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Group Financial Metrics</h2>
                <div className="flex items-center">
                    {/* Pagination Info */}
                    <span className="mr-4">
                        Page {page} of {Math.ceil(total / limit)}
                    </span>

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
                        className={`mr-4 px-4 py-2 rounded bg-blue-500 text-white ${
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
                        className="border border-gray-300 rounded p-2"
                    >
                        <option value="annual">Annual</option>
                        <option value="quarter">Quarterly</option>
                    </select>
                </div>
            </div>

            {metrics.length > 0 ? (
                <>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b whitespace-nowrap">Metric</th>
                                {metrics.map((metric) => (
                                    <th
                                        key={metric?.date}
                                        className="py-2 px-4 border-b whitespace-nowrap overflow-hidden text-ellipsis"
                                    >
                                        {new Date(metric?.date).toLocaleDateString()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Rendering all the metrics from the API */}
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Revenue per Share
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.revenuePerShare?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Net Income per Share
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.netIncomePerShare?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Operating Cash Flow per Share
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.operatingCashFlowPerShare?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Free Cash Flow per Share
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.freeCashFlowPerShare?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Cash per Share
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.cashPerShare?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Book Value per Share
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.bookValuePerShare?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">PE Ratio</td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.peRatio?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Debt to Assets
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.debtToAssets * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Dividend Yield
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.dividendYield * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Graham Number
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {metric?.grahamNumber?.toFixed(2) || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">ROIC</td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.roic * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">ROE</td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.roe * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Growth Revenue
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.growthRevenue * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Growth Operating Income
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.growthOperatingIncome * 100)?.toFixed(2) || 'N/A'}
                                        %
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Growth Net Income
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.growthNetIncome * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">Growth EPS</td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.growthEPS * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b whitespace-nowrap">
                                    Growth Free Cash Flow
                                </td>
                                {metrics.map((metric) => (
                                    <td key={metric?.date} className="py-2 px-4 border-b">
                                        {(metric?.growthFreeCashFlow * 100)?.toFixed(2) || 'N/A'}%
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <p>No group metrics available.</p>
            )}
        </div>
    )
}

export default GroupMetricsTable
