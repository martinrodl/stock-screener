import React, { useState, useEffect } from 'react'
import { useStocksControllerGetBalanceSheetStatementsQuery } from '../services/beGeneratedApi'

const BalanceSheetStatements = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for tracking current page
    const { data, error, isLoading } = useStocksControllerGetBalanceSheetStatementsQuery({
        symbol,
        periodType,
        page,
        limit: 5, // Limit per page
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
        return <p>Loading balance sheet statements...</p>
    }

    if (error) {
        return <p>Error loading balance sheet statements: {error.message}</p>
    }

    // Reverse the statements array to show the latest dates on the right
    const statements = data?.statements?.statements?.slice().reverse() || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Balance Sheet Statements</h2>
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
                            { label: 'Reported Currency', field: 'reportedCurrency' },
                            // { label: 'CIK', field: 'cik' },
                            // {
                            //     label: 'Filing Date',
                            //     field: 'fillingDate',
                            //     format: (date) => formatDate(date),
                            // },
                            // {
                            //     label: 'Accepted Date',
                            //     field: 'acceptedDate',
                            //     format: (date) => formatDate(date),
                            // },
                            { label: 'Calendar Year', field: 'calendarYear' },
                            { label: 'Period', field: 'period' },
                            { label: 'Cash and Cash Equivalents', field: 'cashAndCashEquivalents' },
                            { label: 'Short-Term Investments', field: 'shortTermInvestments' },
                            {
                                label: 'Cash and Short-Term Investments',
                                field: 'cashAndShortTermInvestments',
                            },
                            { label: 'Net Receivables', field: 'netReceivables' },
                            { label: 'Inventory', field: 'inventory' },
                            { label: 'Other Current Assets', field: 'otherCurrentAssets' },
                            { label: 'Total Current Assets', field: 'totalCurrentAssets' },
                            {
                                label: 'Property Plant Equipment Net',
                                field: 'propertyPlantEquipmentNet',
                            },
                            { label: 'Goodwill', field: 'goodwill' },
                            { label: 'Intangible Assets', field: 'intangibleAssets' },
                            {
                                label: 'Goodwill and Intangible Assets',
                                field: 'goodwillAndIntangibleAssets',
                            },
                            { label: 'Long-Term Investments', field: 'longTermInvestments' },
                            { label: 'Tax Assets', field: 'taxAssets' },
                            { label: 'Other Non-Current Assets', field: 'otherNonCurrentAssets' },
                            { label: 'Total Non-Current Assets', field: 'totalNonCurrentAssets' },
                            { label: 'Total Assets', field: 'totalAssets' },
                            { label: 'Account Payables', field: 'accountPayables' },
                            { label: 'Short-Term Debt', field: 'shortTermDebt' },
                            { label: 'Tax Payables', field: 'taxPayables' },
                            { label: 'Deferred Revenue', field: 'deferredRevenue' },
                            {
                                label: 'Other Current Liabilities',
                                field: 'otherCurrentLiabilities',
                            },
                            {
                                label: 'Total Current Liabilities',
                                field: 'totalCurrentLiabilities',
                            },
                            { label: 'Long-Term Debt', field: 'longTermDebt' },
                            {
                                label: 'Deferred Revenue Non-Current',
                                field: 'deferredRevenueNonCurrent',
                            },
                            {
                                label: 'Deferred Tax Liabilities Non-Current',
                                field: 'deferredTaxLiabilitiesNonCurrent',
                            },
                            {
                                label: 'Other Non-Current Liabilities',
                                field: 'otherNonCurrentLiabilities',
                            },
                            {
                                label: 'Total Non-Current Liabilities',
                                field: 'totalNonCurrentLiabilities',
                            },
                            { label: 'Total Liabilities', field: 'totalLiabilities' },
                            { label: 'Preferred Stock', field: 'preferredStock' },
                            { label: 'Common Stock', field: 'commonStock' },
                            { label: 'Retained Earnings', field: 'retainedEarnings' },
                            {
                                label: 'Accumulated Other Comprehensive Income/Loss',
                                field: 'accumulatedOtherComprehensiveIncomeLoss',
                            },
                            {
                                label: 'Other Total Stockholders Equity',
                                field: 'othertotalStockholdersEquity',
                            },
                            {
                                label: 'Total Stockholders Equity',
                                field: 'totalStockholdersEquity',
                            },
                            { label: 'Total Equity', field: 'totalEquity' },
                            { label: 'Minority Interest', field: 'minorityInterest' },
                            {
                                label: 'Total Liabilities and Stockholders Equity',
                                field: 'totalLiabilitiesAndStockholdersEquity',
                            },
                            { label: 'Total Investments', field: 'totalInvestments' },
                            { label: 'Total Debt', field: 'totalDebt' },
                            { label: 'Net Debt', field: 'netDebt' },
                        ].map((row) => (
                            <tr key={row.field}>
                                <td className="py-2 px-4 border-b">{row.label}</td>
                                {statements.map((statement) => (
                                    <td key={statement._id} className="py-2 px-4 border-b">
                                        {row.format
                                            ? row.format(statement[row.field])
                                            : statement[row.field]?.toLocaleString() || 'N/A'}
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
                <p>No balance sheet statements available.</p>
            )}
        </div>
    )
}

export default BalanceSheetStatements
