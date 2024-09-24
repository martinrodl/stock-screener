import React, { useState, useEffect } from 'react'
import { useStocksControllerGetIncomeStatementsQuery } from '../services/beGeneratedApi'

const IncomeStatements = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for tracking current page
    const { data, error, isLoading } = useStocksControllerGetIncomeStatementsQuery({
        symbol,
        periodType,
        page,
        limit: 5,
    })

    useEffect(() => {
        if (!isLoading && data?.statements?.statements) {
            onLoadComplete()
        }
    }, [data, isLoading, onLoadComplete])

    const handlePrevious = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    const handleNext = () => {
        if (data?.statements?.statements.length === 5) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    // Custom date formatter to use periods as separators
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
        const year = date.getFullYear()
        return `${day}. ${month}. ${year}`
    }

    if (isLoading) {
        return <p>Loading income statements...</p>
    }

    if (error) {
        return <p>Error loading income statements: {error.message}</p>
    }

    // Reverse the statements array to show the latest dates on the right
    const statements = data?.statements?.statements?.slice().reverse() || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Income Statements</h2>
                <div className="flex items-center">
                    {/* Next Button (flipped to left) */}
                    {statements.length === 5 && (
                        <button
                            onClick={handleNext}
                            className="mr-4 px-4 py-2 rounded bg-blue-500 text-white"
                        >
                            {'<'}
                        </button>
                    )}

                    {/* Previous Button (flipped to right) */}
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
                            setPage(1) // Reset page on period type change
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
                            <th className="py-2 px-4 border-b">Field</th>
                            {statements.map((statement) => (
                                <th key={statement._id} className="py-2 px-4 border-b">
                                    {formatDate(statement.date)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: 'Revenue', field: 'revenue' },
                            { label: 'Cost of Revenue', field: 'costOfRevenue' },
                            { label: 'Gross Profit', field: 'grossProfit' },
                            { label: 'Gross Profit Ratio', field: 'grossProfitRatio' },
                            {
                                label: 'Research & Development Expenses',
                                field: 'researchAndDevelopmentExpenses',
                            },
                            {
                                label: 'Selling, General & Administrative Expenses',
                                field: 'sellingGeneralAndAdministrativeExpenses',
                            },
                            { label: 'Operating Expenses', field: 'operatingExpenses' },
                            { label: 'Operating Income', field: 'operatingIncome' },
                            { label: 'Operating Income Ratio', field: 'operatingIncomeRatio' },
                            { label: 'EBITDA', field: 'ebitda' },
                            { label: 'EBITDA Ratio', field: 'ebitdaratio' },
                            {
                                label: 'Total Other Income/Expenses Net',
                                field: 'totalOtherIncomeExpensesNet',
                            },
                            { label: 'Income Before Tax', field: 'incomeBeforeTax' },
                            { label: 'Income Before Tax Ratio', field: 'incomeBeforeTaxRatio' },
                            { label: 'Income Tax Expense', field: 'incomeTaxExpense' },
                            { label: 'Net Income', field: 'netIncome' },
                            { label: 'Net Income Ratio', field: 'netIncomeRatio' },
                            { label: 'EPS (Basic)', field: 'eps' },
                            { label: 'EPS (Diluted)', field: 'epsdiluted' },
                            {
                                label: 'Weighted Avg Shares Outstanding',
                                field: 'weightedAverageShsOut',
                            },
                            {
                                label: 'Weighted Avg Shares Outstanding (Diluted)',
                                field: 'weightedAverageShsOutDil',
                            },
                        ].map((row) => (
                            <tr key={row.field}>
                                <td className="py-2 px-4 border-b">{row.label}</td>
                                {statements.map((statement) => (
                                    <td key={statement._id} className="py-2 px-4 border-b">
                                        {statement[row.field]?.toLocaleString() || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className="py-2 px-4 border-b">Link</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    <a
                                        href={statement.finalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View
                                    </a>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No income statements available.</p>
            )}
        </div>
    )
}

export default IncomeStatements
