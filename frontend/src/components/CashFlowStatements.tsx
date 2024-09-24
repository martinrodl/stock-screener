import React, { useState, useEffect } from 'react'
import { useStocksControllerGetCashFlowStatementsQuery } from '../services/beGeneratedApi'

const CashFlowStatements = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const [page, setPage] = useState(1) // State for tracking current page
    const { data, error, isLoading } = useStocksControllerGetCashFlowStatementsQuery({
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
        return <p>Loading cash flow statements...</p>
    }

    if (error) {
        return <p>Error loading cash flow statements: {error.message}</p>
    }

    // Reverse the statements array to show the latest dates on the right
    const statements = data?.statements?.statements?.slice().reverse() || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Cash Flow Statements</h2>
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
                            { label: 'Net Income', field: 'netIncome' },
                            {
                                label: 'Depreciation & Amortization',
                                field: 'depreciationAndAmortization',
                            },
                            { label: 'Deferred Income Tax', field: 'deferredIncomeTax' },
                            { label: 'Stock-Based Compensation', field: 'stockBasedCompensation' },
                            { label: 'Change in Working Capital', field: 'changeInWorkingCapital' },
                            { label: 'Accounts Receivables', field: 'accountsReceivables' },
                            { label: 'Inventory', field: 'inventory' },
                            { label: 'Accounts Payables', field: 'accountsPayables' },
                            { label: 'Other Working Capital', field: 'otherWorkingCapital' },
                            { label: 'Other Non-Cash Items', field: 'otherNonCashItems' },
                            {
                                label: 'Net Cash from Operating Activities',
                                field: 'netCashProvidedByOperatingActivities',
                            },
                            {
                                label: 'Investments in Property, Plant & Equipment',
                                field: 'investmentsInPropertyPlantAndEquipment',
                            },
                            { label: 'Acquisitions Net', field: 'acquisitionsNet' },
                            { label: 'Purchases of Investments', field: 'purchasesOfInvestments' },
                            {
                                label: 'Sales/Maturities of Investments',
                                field: 'salesMaturitiesOfInvestments',
                            },
                            {
                                label: 'Other Investing Activities',
                                field: 'otherInvestingActivites',
                            },
                            {
                                label: 'Net Cash Used in Investing Activities',
                                field: 'netCashUsedForInvestingActivites',
                            },
                            { label: 'Debt Repayment', field: 'debtRepayment' },
                            { label: 'Common Stock Issued', field: 'commonStockIssued' },
                            { label: 'Common Stock Repurchased', field: 'commonStockRepurchased' },
                            { label: 'Dividends Paid', field: 'dividendsPaid' },
                            {
                                label: 'Other Financing Activities',
                                field: 'otherFinancingActivites',
                            },
                            {
                                label: 'Net Cash Used in Financing Activities',
                                field: 'netCashUsedProvidedByFinancingActivities',
                            },
                            { label: 'Net Change in Cash', field: 'netChangeInCash' },
                            {
                                label: 'Cash at Beginning of Period',
                                field: 'cashAtBeginningOfPeriod',
                            },
                            { label: 'Cash at End of Period', field: 'cashAtEndOfPeriod' },
                            { label: 'Operating Cash Flow', field: 'operatingCashFlow' },
                            { label: 'Capital Expenditure', field: 'capitalExpenditure' },
                            { label: 'Free Cash Flow', field: 'freeCashFlow' },
                        ].map((row) => (
                            <tr key={row.field}>
                                <td className="py-2 px-4 border-b">{row.label}</td>
                                {statements.map((statement) => (
                                    <td key={statement._id} className="py-2 px-4 border-b">
                                        {statement[row.field]?.toLocaleString() || '-'}
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
                <p>No cash flow statements available.</p>
            )}
        </div>
    )
}

export default CashFlowStatements
