import React, { useState, useEffect } from 'react'
import { useStocksControllerGetIncomeStatementsQuery } from '../services/beGeneratedApi'

const IncomeStatements = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetIncomeStatementsQuery({
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
        return <p>Loading income statements...</p>
    }

    if (error) {
        return <p>Error loading income statements: {error.message}</p>
    }

    const statements = data?.statements?.statements || []

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Income Statements</h2>
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
                            <td className="py-2 px-4 border-b">Revenue</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.revenue?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Cost of Revenue</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.costOfRevenue?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Gross Profit</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.grossProfit?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Operating Income</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.operatingIncome?.toLocaleString() || '-'}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Net Income</td>
                            {statements.map((statement) => (
                                <td key={statement._id} className="py-2 px-4 border-b">
                                    {statement.netIncome?.toLocaleString() || '-'}
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
                <p>No income statements available.</p>
            )}
        </div>
    )
}

export default IncomeStatements
