import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import BasicInfoTable from '../components/BasicInfoTable'
import MetricsBarChartWrapper from '../components/MetricsBarChartWrapper'
import StatementBarChartWrapper from '../components/StatementBarChartWrapper'
import StatementTable from '../components/StatementTable'
import MetricsTable from '../components/MetricsTable'
import News from '../components/News'
import StockTable from '../components/SureTable'
import ActualValuesTable from '../components/ActualValuesTable'
import AnalystRatingsSummary from '../components/AnalystRatingsSummary'
import AnalystRatingsDetailed from '../components/AnalystRatingsDetailed'
import InsideTrades from '../components/InsideTrades'
import BalanceSheetStatements from '../components/BalanceSheetStatements'
import CashFlowStatements from '../components/CashFlowStatements'
import IncomeStatements from '../components/IncomeStatements'
import IncomeGrowthMetrics from '../components/IncomeGrowthMetrics'
import KeyMetrics from '../components/KeyMetrics'
import ProfitGrowthMetrics from '../components/ProfitGrowthMetrics'

import {
    useStocksControllerGetStockQuery,
    useStocksControllerGetProfileQuery,
    useStocksControllerUpdateStockValuesMutation,
} from '../services/beGeneratedApi'
import { delay } from '../helpers/delay'

const StockDetails = () => {
    const { symbol } = useParams()
    const navigate = useNavigate()

    const {
        data: stock,
        error: stockError,
        isLoading: stockLoading,
        refetch: refetchStock,
    } = useStocksControllerGetStockQuery({ symbol: symbol ?? '' })

    const {
        data: profile,
        error: profileError,
        isLoading: profileLoading,
        refetch: refetchProfile,
    } = useStocksControllerGetProfileQuery({ symbol: symbol ?? '' })

    const [updateStockValues] = useStocksControllerUpdateStockValuesMutation()

    const handleBackButtonClick = () => {
        navigate(-1) // Navigates back to the last page in history
    }

    const handleUpdateButtonClick = async () => {
        try {
            await updateStockValues({ symbol: symbol ?? '', periodType: 'annual' }).unwrap()
            await delay(2000)
            window.location.reload() // Reload the page to fetch updated data
        } catch (error) {
            console.error('Failed to update stock values:', error)
        }
    }

    const handleRetryClick = () => {
        refetchStock()
        refetchProfile()
        refetchGroupMetrics()
        refetchGroupStatements()
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (stockLoading || profileLoading) {
                handleRetryClick()
            }
        }, 10000) // 10 seconds timeout

        return () => clearTimeout(timeout)
    }, [stockLoading, profileLoading])

    const getTopButtons = () => (
        <div className="flex w-full p-4 justify-around">
            <button
                onClick={handleBackButtonClick}
                className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Back to Stocks
            </button>
            <button
                onClick={handleUpdateButtonClick}
                className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Update Stock Values
            </button>
            <button
                onClick={handleRetryClick}
                className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Retry Loading
            </button>
        </div>
    )

    if (stockLoading || profileLoading) {
        return (
            <div>
                {getTopButtons()}
                <h2 className="mt-5 ml-5">Loading...</h2>
            </div>
        )
    }

    if (stockError || profileError) {
        return (
            <div>
                {getTopButtons()}
                <div className="mt-5 ml-5">Error: {String(stockError || profileError)}</div>
            </div>
        )
    }

    if (!stock) {
        return (
            <div>
                {getTopButtons()}
                <h2 className="mt-5 ml-5">Stock not found</h2>
            </div>
        )
    }

    return (
        <div className="p-4 flex flex-col gap-y-5 items-center max-w-4xl">
            {getTopButtons()}
            <div className="flex gap-x-3 items-center mb-4">
                <h1 className="text-xl font-bold">
                    {stock.name} ({stock.symbol})
                </h1>
                <p>Exchange: {stock.exchange}</p>
            </div>
            {profile && (
                <div className="flex flex-col gap-y-1 my-2">
                    <h3 className="font-semibold">Description:</h3>
                    {profile.description && <p className="text-sm">{profile.description}</p>}
                    <div className="flex flex-col">
                        {profile.sector && <h3 className="">Sector: {profile.sector}</h3>}
                        {profile.industry && <h3 className="">Industry: {profile.industry}</h3>}
                        {profile.country && <h3 className="">Country: {profile.country}</h3>}
                    </div>
                </div>
            )}
            <BasicInfoTable symbol={symbol} />
            <MetricsBarChartWrapper
                symbol={symbol || ''}
                initialSelectedProperties={[
                    { value: 'freeCashFlowPerShare', label: 'freeCashFlowPerShare' },
                    { value: 'bookValuePerShare', label: 'bookValuePerShare' },
                    { value: 'revenuePerShare', label: 'revenuePerShare' },
                    { value: 'netIncomePerShare', label: 'netIncomePerShare' },
                ]}
            />
            <StatementBarChartWrapper
                symbol={symbol || ''}
                initialSelectedProperties={[
                    { value: 'netIncome', label: 'Net Income' },
                    { value: 'revenue', label: 'Revenue' },
                ]}
            />
            <StatementTable symbol={stock.symbol} />
            <MetricsTable symbol={stock.symbol} />
            <ActualValuesTable symbol={stock.symbol} />
            <BalanceSheetStatements symbol={symbol} />
            <CashFlowStatements symbol={symbol} />
            <IncomeStatements symbol={symbol} />
            <IncomeGrowthMetrics symbol={symbol} />
            <KeyMetrics symbol={symbol} />
            <ProfitGrowthMetrics symbol={symbol} />

            <AnalystRatingsSummary symbol={stock.symbol} />
            <AnalystRatingsDetailed symbol={stock.symbol} />
            <InsideTrades symbol={symbol ?? ''} />

            <StockTable symbol={stock.symbol} />
            <News symbol={stock.symbol} />
        </div>
    )
}

export default StockDetails
