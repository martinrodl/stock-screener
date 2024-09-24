import React, { useState, useEffect } from 'react'
import { useStocksControllerGetGroupStatementsQuery } from '../services/beGeneratedApi'

const GroupStatementTable = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for tracking current page
    const { data, error, isLoading } = useStocksControllerGetGroupStatementsQuery({
        symbol,
        periodType,
        page,
        limit: 5, // Limit per page
    })

    useEffect(() => {
        if (!isLoading && data?.statements?.length) {
            onLoadComplete()
        }
    }, [data, isLoading, onLoadComplete])

    const handlePrevious = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    const handleNext = () => {
        if (data?.statements?.length === 5) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    if (isLoading) {
        return <p>Loading group statements...</p>
    }

    if (error) {
        return <p>Error loading group statements: {error.message}</p>
    }

    // Reverse the order of the statements array
    const statements = ([...(data?.statements ?? [])] || []).reverse()

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Group Financial Statements</h2>
                <div className="flex items-center">
                    {/* Next Button */}
                    {statements.length === 5 && (
                        <button
                            onClick={handleNext}
                            className="mr-4 px-4 py-2 rounded bg-blue-500 text-white"
                        >
                            {'<'}
                        </button>
                    )}

                    {/* Previous Button */}
                    {page > 1 && (
                        <button
                            onClick={handlePrevious}
                            className="mr-4 px-4 py-2 rounded bg-blue-500 text-white"
                        >
                            {'>'}
                        </button>
                    )}

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

            {statements.length > 0 ? (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b whitespace-nowrap">Metric</th>
                            {statements.map((statement) => (
                                <th
                                    key={statement.date}
                                    className="py-2 px-4 border-b whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                    {new Date(statement.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">EPS</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.eps?.toFixed(2) || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Revenue</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.revenue?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Gross Profit</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.grossProfit?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.netIncome?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Margin</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.operatingIncome && statement.revenue
                                        ? `${(
                                              (statement.operatingIncome / statement.revenue) *
                                              100
                                          ).toFixed(2)}%`
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Free Cash Flow</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.freeCashFlow?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Total Assets</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.totalAssets?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Total Liabilities</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.totalLiabilities?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Long Term Debt</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.longTermDebt?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Debt</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.netDebt?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Shareholder Returns</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {statement.dividendsPaid !== undefined &&
                                    statement.commonStockRepurchased !== undefined
                                        ? (
                                              statement.dividendsPaid +
                                              statement.commonStockRepurchased
                                          ).toLocaleString()
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No group statements available.</p>
            )}
        </div>
    )
}

export default GroupStatementTable
