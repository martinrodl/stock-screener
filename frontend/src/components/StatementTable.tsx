import React, { useState, useEffect } from 'react'
import { useStocksControllerGetGroupStatementsQuery } from '../services/beGeneratedApi'

const GroupStatementTable = ({ symbol, onLoadComplete }) => {
    const [periodType, setPeriodType] = useState('annual')
    const { data, error, isLoading } = useStocksControllerGetGroupStatementsQuery({
        symbol,
        periodType,
        limit: 5,
    })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

    if (isLoading) {
        return <p>Loading group statements...</p>
    }

    if (error) {
        return <p>Error loading group statements: {error.message}</p>
    }

    // Reverse the order of the statements array
    const statements = ([...data] || []).reverse()

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Group Financial Statements</h2>
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
                            <th className="py-2 px-4 border-b">Metric</th>
                            {statements.map((statement) => (
                                <th key={statement.date} className="py-2 px-4 border-b">
                                    {new Date(statement.date).toLocaleDateString()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Add rows for each property from the API */}
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
                                    {/* Calculate Operating Margin: (Operating Income / Revenue) * 100 */}
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
                        {/* Shareholder Returns */}
                        <tr>
                            <td className="py-2 px-4 border-b">Shareholder Returns</td>
                            {statements.map((statement) => (
                                <td key={statement.date} className="py-2 px-4 border-b">
                                    {/* Sum Dividends Paid and Common Stock Repurchased */}
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
