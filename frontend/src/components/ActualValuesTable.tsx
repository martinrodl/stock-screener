import React, { useEffect } from 'react'
import { useStocksControllerGetStockActualValuesQuery } from '../services/beGeneratedApi'

const ActualValuesTable = ({ symbol, onLoadComplete }) => {
    const { data, error, isLoading } = useStocksControllerGetStockActualValuesQuery({ symbol })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

    if (isLoading) {
        return <p>Loading actual values...</p>
    }

    if (error) {
        return <p>Error loading actual values: {error.message}</p>
    }

    const actualValues = data || {}

    const formatValue = (value, fixed = 2) => {
        return value !== undefined && value !== null ? value.toFixed(fixed) : 'N/A'
    }

    const formatPercentage = (value) => {
        return value !== undefined && value !== null ? `${(value * 100).toFixed(2)}%` : 'N/A'
    }

    const formatLargeNumber = (value) => {
        return value !== undefined && value !== null ? value.toLocaleString() : 'N/A'
    }

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Actual Values</h2>
            <table className="min-w-full bg-white border">
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Date</td>
                        <td className="py-2 px-4 border-b">
                            {actualValues?.date
                                ? new Date(actualValues.date).toLocaleDateString()
                                : 'N/A'}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">CAPE Ratio</td>
                        <td className="py-2 px-4 border-b">
                            {formatValue(actualValues?.capeRatio)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Intrinsic Value (Zero Growth)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatValue(actualValues?.intrinsicValueZeroGrowth)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Intrinsic Value (Average Growth 5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatValue(actualValues?.intrinsicValueAverageGrowth5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Intrinsic Value (Last Year Growth)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatValue(actualValues?.intrinsicValueLastYearGrowth)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Peter Lynch Value</td>
                        <td className="py-2 px-4 border-b">
                            {formatValue(actualValues?.peterlynchValue)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Shares Outstanding</td>
                        <td className="py-2 px-4 border-b">
                            {formatLargeNumber(actualValues?.sharesOutstanding)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Shares Outstanding (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatLargeNumber(actualValues?.sharesOutstanding5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">ROE (5y)</td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.roe5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">ROIC (5y)</td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.roic5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Profit Growth (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.averageProfitGrowth5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Dividend Growth (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.averageDividendGrowth5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Net Income Growth (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.averageNetIncomeGrowth5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Average Profit Margin (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.averageProfitMargin5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Debt Per Share</td>
                        <td className="py-2 px-4 border-b">
                            {formatValue(actualValues?.debtPerShare)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Dividend Yield (5y)</td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.dividendYield5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">
                            Dividend Payout Ratio (5y)
                        </td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.dividendPayoutRatio5y)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Buyback Yield</td>
                        <td className="py-2 px-4 border-b">
                            {formatPercentage(actualValues?.buybackYield)}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b font-semibold">Free Cash Flow</td>
                        <td className="py-2 px-4 border-b">
                            {formatLargeNumber(actualValues?.freeCashFlow)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ActualValuesTable
