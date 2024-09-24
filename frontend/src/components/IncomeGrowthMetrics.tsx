import React, { useState, useEffect } from 'react'
import { useStocksControllerGetIncomeGrowthMetricsQuery } from '../services/beGeneratedApi'

const IncomeGrowthMetrics = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for pagination
    const limit = 5 // Limit per page

    const { data, error, isLoading } = useStocksControllerGetIncomeGrowthMetricsQuery({
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

    const total = data?.metrics?.total || 0
    const metrics = data?.metrics?.metrics || []

    const totalPages = Math.ceil(total / limit)

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1)
    }

    if (isLoading) {
        return <p>Loading income growth metrics...</p>
    }

    if (error) {
        return <p>Error loading income growth metrics: {error.message}</p>
    }

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Income Growth Metrics</h2>
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
                            <th className="py-2 px-4 border-b">Field</th>
                            {metrics.map((metric) => (
                                <th key={metric._id} className="py-2 px-4 border-b">
                                    {new Date(metric.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Add rows for each metric from the API response */}
                        <tr>
                            <td className="py-2 px-4 border-b">Revenue Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthRevenue !== undefined
                                        ? (metric.growthRevenue * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Cost of Revenue Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthCostOfRevenue !== undefined
                                        ? (metric.growthCostOfRevenue * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Gross Profit Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthGrossProfit !== undefined
                                        ? (metric.growthGrossProfit * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Income Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthOperatingIncome !== undefined
                                        ? (metric.growthOperatingIncome * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
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
                            <td className="py-2 px-4 border-b">EPS Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthEPS !== undefined
                                        ? (metric.growthEPS * 100).toFixed(2) + '%'
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
                            <td className="py-2 px-4 border-b">Interest Expense Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthInterestExpense !== undefined
                                        ? (metric.growthInterestExpense * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Expenses Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthOperatingExpenses !== undefined
                                        ? (metric.growthOperatingExpenses * 100).toFixed(2) + '%'
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
                        <tr>
                            <td className="py-2 px-4 border-b">Inventory Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthInventory !== undefined
                                        ? (metric.growthInventory * 100).toFixed(2) + '%'
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Dividends Paid Growth</td>
                            {metrics.map((metric) => (
                                <td key={metric._id} className="py-2 px-4 border-b">
                                    {metric.growthDividendsPaid !== undefined
                                        ? (metric.growthDividendsPaid * 100).toFixed(2) + '%'
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
