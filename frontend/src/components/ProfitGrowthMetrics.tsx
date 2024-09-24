import React, { useState, useEffect } from 'react'
import { useStocksControllerGetProfitGrowthMetricsQuery } from '../services/beGeneratedApi'

const ProfitGrowthMetrics = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for pagination
    const limit = 5 // Limit per page

    const { data, error, isLoading } = useStocksControllerGetProfitGrowthMetricsQuery({
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

    // Extract total and metrics from the API response
    const total = data?.metrics?.total || 0
    const metrics = data?.metrics?.metrics || []
    const totalPages = Math.ceil(total / limit)

    // Pagination control handlers
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1)
    }

    if (isLoading) {
        return <p>Loading profit growth metrics...</p>
    }

    if (error) {
        return <p>Error loading profit growth metrics: {error.message}</p>
    }

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Profit Growth Metrics</h2>
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
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded bg-blue-500 text-white ${
                            page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
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
                        {/* Implementing all properties from the API response */}
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthNetIncome * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">
                                Depreciation & Amortization Growth
                            </td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthDepreciationAndAmortization * 100).toFixed(2) +
                                        '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Deferred Income Tax Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthDeferredIncomeTax * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Stock-Based Compensation Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthStockBasedCompensation * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Change in Working Capital Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthChangeInWorkingCapital * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Accounts Receivables Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthAccountsReceivables * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Inventory Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthInventory * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Accounts Payables Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthAccountsPayables * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Cash Flow Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthOperatingCashFlow * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Capital Expenditure Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthCapitalExpenditure * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Free Cash Flow Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthFreeCashFlow * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Debt Repayment Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthDebtRepayment * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Common Stock Repurchased Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthCommonStockRepurchased * 100).toFixed(2) + '%'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Dividends Paid Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {(metric.growthDividendsPaid * 100).toFixed(2) + '%'}
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
