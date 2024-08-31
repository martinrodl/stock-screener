import React from 'react'
import { useStocksControllerGetStockActualValuesQuery } from '../services/beGeneratedApi'

const ActualValuesTable = ({ symbol }) => {
    const { data, error, isLoading } = useStocksControllerGetStockActualValuesQuery({ symbol })

    if (isLoading) {
        return <p>Loading actual values...</p>
    }

    if (error) {
        return <p>Error loading actual values: {error.message}</p>
    }

    const actualValues = data || {}

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Actual Values</h2>
            <table className="min-w-full bg-white border">
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Date</td>
                        <td className="py-2 px-4 border-b">
                            {new Date(actualValues.date).toLocaleDateString()}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">CAPE Ratio</td>
                        <td className="py-2 px-4 border-b">{actualValues.capeRatio.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Intrinsic Value (Zero Growth)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.intrinsicValueZeroGrowth.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Intrinsic Value (Average Growth 5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.intrinsicValueAverageGrowth5y.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Intrinsic Value (Last Year Growth)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.intrinsicValueLastYearGrowth.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Peter Lynch Value</td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.peterlynchValue.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Shares Outstanding</td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.sharesOutstanding.toLocaleString()}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Shares Outstanding (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.sharesOutstanding5y.toLocaleString()}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">ROE (5y)</td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.roe5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">ROIC (5y)</td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.roic5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Profit Growth (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.averageProfitGrowth5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Dividend Growth (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.averageDividendGrowth5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Net Income Growth (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.averageNetIncomeGrowth5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Profit Margin (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.averageProfitMargin5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Debt Per Share</td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.debtPerShare.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Dividend Yield (5y)</td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.dividendYield5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Dividend Payout Ratio (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.dividendPayoutRatio5y * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Buyback Yield</td>
                        <td className="py-2 px-4 border-b">
                            {(actualValues.buybackYield * 100).toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Free Cash Flow</td>
                        <td className="py-2 px-4 border-b">
                            {actualValues.freeCashFlow.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ActualValuesTable
