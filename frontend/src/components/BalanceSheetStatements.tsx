import React, { useState } from 'react'
import { useStocksControllerGetBalanceSheetStatementsQuery } from '../services/beGeneratedApi'

const BalanceSheetStatements = ({ symbol }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetBalanceSheetStatementsQuery({
        symbol,
        periodType,
        page: 1,
        limit: 5,
    })

    if (isLoading) {
        return <p>Loading balance sheet statements...</p>
    }

    if (error) {
        return <p>Error loading balance sheet statements: {error.message}</p>
    }

    const statements = data?.statements?.statements || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Balance Sheet Statements</h2>
                <select
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value)}
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="annual">Annual</option>
                    <option value="quarter">Quarterly</option>
                </select>
            </div>
            {statements.length > 0 ? (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Field</th>
                            {statements.map((statement) => (
                                <th key={statement._id} className="py-2 px-4 border-b">
                                    {new Date(statement.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">Total Assets</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.totalAssets.toLocaleString()}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Total Liabilities</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.totalLiabilities.toLocaleString()}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Total Equity</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.totalEquity.toLocaleString()}
                                </td>
                            ))}
                        </tr>
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
