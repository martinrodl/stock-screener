import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import ErrorBoundary from '../components/ErrorBoundary' // Import the ErrorBoundary

import {
    useStocksControllerGetStockQuery,
    useStocksControllerGetProfileQuery,
    useStocksControllerUpdateStockValuesMutation,
} from '../services/beGeneratedApi'
import { delay } from '../helpers/delay'

const StockDetails = () => {
    const { symbol } = useParams()
    const navigate = useNavigate()

    const [isBasicInfoLoaded, setBasicInfoLoaded] = useState(false)
    const [isMetricsChartLoaded, setMetricsChartLoaded] = useState(false)
    const [isStatementsChartLoaded, setStatementsChartLoaded] = useState(false)
    const [isStatementTableLoaded, setStatementTableLoaded] = useState(false)
    const [isMetricsTableLoaded, setMetricsTableLoaded] = useState(false)
    const [isActualValuesTableLoaded, setActualValuesTableLoaded] = useState(false)
    const [isBalanceSheetLoaded, setBalanceSheetLoaded] = useState(false)
    const [isCashFlowLoaded, setCashFlowLoaded] = useState(false)
    const [isIncomeStatementsLoaded, setIncomeStatementsLoaded] = useState(false)
    const [isIncomeGrowthLoaded, setIncomeGrowthLoaded] = useState(false)
    const [isKeyMetricsLoaded, setKeyMetricsLoaded] = useState(false)
    const [isProfitGrowthLoaded, setProfitGrowthLoaded] = useState(false)

    const [isAnalystRatingsSummaryLoaded, setAnalystRatingsSummaryLoaded] = useState(false)
    const [isAnalystRatingsDetailedLoaded, setAnalystRatingsDetailedLoaded] = useState(false)
    const [isInsideTradesLoaded, setInsideTradesLoaded] = useState(false)
    const [isStockTableLoaded, setStockTableLoaded] = useState(false)
    const [isNewsLoaded, setNewsLoaded] = useState(false)

    const [isUpdating, setIsUpdating] = useState(false)
    const [isRetrying, setIsRetrying] = useState(false)

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
        navigate(-1)
    }

    const handleUpdateButtonClick = async () => {
        setIsUpdating(true)
        try {
            await updateStockValues({ symbol: symbol ?? '', periodType: 'annual' }).unwrap()
            await delay(2000)
            window.location.reload()
        } catch (error) {
            console.error('Failed to update stock values:', error)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleRetryClick = useCallback(async () => {
        setIsRetrying(true)
        try {
            await refetchStock()
            await refetchProfile()
        } finally {
            setIsRetrying(false)
        }
    }, [refetchStock, refetchProfile])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (stockLoading || profileLoading) {
                handleRetryClick()
            }
        }, 10000)

        return () => clearTimeout(timeout)
    }, [stockLoading, profileLoading, handleRetryClick])

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
                disabled={isUpdating}
            >
                {isUpdating ? 'Updating...' : 'Update Stock Values'}
            </button>
            <button
                onClick={handleRetryClick}
                className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isRetrying}
            >
                {isRetrying ? 'Retrying...' : 'Retry Loading'}
            </button>
        </div>
    )

    if (stockLoading || profileLoading || isUpdating || isRetrying) {
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
            <ErrorBoundary>
                <BasicInfoTable symbol={symbol} onLoadComplete={() => setBasicInfoLoaded(true)} />
            </ErrorBoundary>
            {isBasicInfoLoaded && (
                <ErrorBoundary>
                    <MetricsBarChartWrapper
                        symbol={symbol || ''}
                        initialSelectedProperties={[
                            { value: 'freeCashFlowPerShare', label: 'freeCashFlowPerShare' },
                            { value: 'bookValuePerShare', label: 'bookValuePerShare' },
                            { value: 'revenuePerShare', label: 'revenuePerShare' },
                            { value: 'netIncomePerShare', label: 'netIncomePerShare' },
                        ]}
                        onLoadComplete={() => setMetricsChartLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isMetricsChartLoaded && (
                <ErrorBoundary>
                    <StatementBarChartWrapper
                        symbol={symbol || ''}
                        initialSelectedProperties={[
                            { value: 'netIncome', label: 'Net Income' },
                            { value: 'revenue', label: 'Revenue' },
                        ]}
                        onLoadComplete={() => setStatementsChartLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isStatementsChartLoaded && (
                <ErrorBoundary>
                    <StatementTable
                        symbol={stock.symbol}
                        onLoadComplete={() => setStatementTableLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isStatementTableLoaded && (
                <ErrorBoundary>
                    <MetricsTable
                        symbol={stock.symbol}
                        onLoadComplete={() => setMetricsTableLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isMetricsTableLoaded && (
                <ErrorBoundary>
                    <ActualValuesTable
                        symbol={stock.symbol}
                        onLoadComplete={() => setActualValuesTableLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isActualValuesTableLoaded && (
                <ErrorBoundary>
                    <BalanceSheetStatements
                        symbol={symbol}
                        onLoadComplete={() => setBalanceSheetLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isBalanceSheetLoaded && (
                <ErrorBoundary>
                    <CashFlowStatements
                        symbol={symbol}
                        onLoadComplete={() => setCashFlowLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isCashFlowLoaded && (
                <ErrorBoundary>
                    <IncomeStatements
                        symbol={symbol}
                        onLoadComplete={() => setIncomeStatementsLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isIncomeStatementsLoaded && (
                <ErrorBoundary>
                    <IncomeGrowthMetrics
                        symbol={symbol}
                        onLoadComplete={() => setIncomeGrowthLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isIncomeGrowthLoaded && (
                <ErrorBoundary>
                    <KeyMetrics symbol={symbol} onLoadComplete={() => setKeyMetricsLoaded(true)} />
                </ErrorBoundary>
            )}
            {isKeyMetricsLoaded && (
                <ErrorBoundary>
                    <ProfitGrowthMetrics
                        symbol={symbol}
                        onLoadComplete={() => setProfitGrowthLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isProfitGrowthLoaded && (
                <ErrorBoundary>
                    <AnalystRatingsSummary
                        symbol={stock.symbol}
                        onLoadComplete={() => setAnalystRatingsSummaryLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isAnalystRatingsSummaryLoaded && (
                <ErrorBoundary>
                    <AnalystRatingsDetailed
                        symbol={stock.symbol}
                        onLoadComplete={() => setAnalystRatingsDetailedLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isAnalystRatingsDetailedLoaded && (
                <ErrorBoundary>
                    <InsideTrades
                        symbol={symbol ?? ''}
                        onLoadComplete={() => setInsideTradesLoaded(true)}
                    />
                </ErrorBoundary>
            )}
            {isAnalystRatingsDetailedLoaded && (
                <ErrorBoundary>
                    <News symbol={stock.symbol} onLoadComplete={() => setNewsLoaded(true)} />
                </ErrorBoundary>
            )}
            )
            <ErrorBoundary>
                <StockTable
                    symbol={stock.symbol}
                    onLoadComplete={() => setStockTableLoaded(true)}
                />
            </ErrorBoundary>
        </div>
    )
}

export default StockDetails
