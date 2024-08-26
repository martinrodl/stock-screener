import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getProperties } from '../helpers/getPropertyData'
import BarChart from '../components/BarChart'
import BasicInfoTable from '../components/BasicInfoTable'
import StatementTable from '../components/StatementTable'
import MetricsTable from '../components/MetricsTable'
import DetailMetricsTable from '../components/DetailMetricsTable'
import StockTable from '../components/SureTable'
import {
    useStocksControllerGetStockQuery,
    useStocksControllerGetProfileQuery,
    useStocksControllerUpdateStockValuesMutation,
    useStocksControllerGetGroupMetricsQuery,
    useStocksControllerGetGroupStatementsQuery,
} from '../services/beGeneratedApi'
import { delay } from '../helpers/delay'

const StockDetails = () => {
    const { symbol } = useParams()
    const navigate = useNavigate()

    const [metricDatasets, setMetricDatasets] = useState<any[]>([])
    const [statementDatasets, setStatementDatasets] = useState<any[]>([])
    const [selectedMetricProperties, setSelectedMetricProperties] = useState<any[]>([
        { value: 'freeCashFlowPerShare', label: 'freeCashFlowPerShare' },
        { value: 'bookValuePerShare', label: 'bookValuePerShare' },
        { value: 'revenuePerShare', label: 'revenuePerShare' },
        { value: 'netIncomePerShare', label: 'netIncomePerShare' },
    ])
    const [selectedStatementProperties, setSelectedStatementProperties] = useState<any[]>([
        { value: 'netIncome', label: 'netIncome' },
        { value: 'revenue', label: 'revenue' },
    ])
    const [metricPropertyOptions, setMetricPropertyOptions] = useState<any[]>([])
    const [statementPropertyOptions, setStatementPropertyOptions] = useState<any[]>([])

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

    const {
        data: groupMetrics,
        error: groupMetricsError,
        isLoading: groupMetricsLoading,
        refetch: refetchGroupMetrics,
    } = useStocksControllerGetGroupMetricsQuery({ symbol: symbol ?? '', periodType: 'annual' })

    const {
        data: groupStatements,
        error: groupStatementsError,
        isLoading: groupStatementsLoading,
        refetch: refetchGroupStatements,
    } = useStocksControllerGetGroupStatementsQuery({ symbol: symbol ?? '', periodType: 'annual' })

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
        const extractKeys = (data) => {
            const keys = new Set()
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    Object.keys(item).forEach((key) => keys.add(key))
                })
            }
            return Array.from(keys).filter(
                (key) => !['date', 'period', 'calendarYear'].includes(key)
            )
        }

        if (groupMetrics && groupStatements) {
            const metricsKeys = extractKeys(groupMetrics)
            const statementsKeys = extractKeys(groupStatements)

            const metricOptions = metricsKeys.map((key) => ({ value: key, label: key }))
            const statementOptions = statementsKeys.map((key) => ({ value: key, label: key }))

            setMetricPropertyOptions(metricOptions)
            setStatementPropertyOptions(statementOptions)

            // Set default selected values
            setSelectedMetricProperties([
                { value: 'freeCashFlowPerShare', label: 'freeCashFlowPerShare' },
                { value: 'bookValuePerShare', label: 'bookValuePerShare' },
                { value: 'revenuePerShare', label: 'revenuePerShare' },
                { value: 'netIncomePerShare', label: 'netIncomePerShare' },
            ])

            setSelectedStatementProperties([
                { value: 'netIncome', label: 'netIncome' },
                { value: 'revenue', label: 'revenue' },
            ])
        }
    }, [groupMetrics, groupStatements])

    useEffect(() => {
        if (groupMetrics && selectedMetricProperties.length > 0) {
            const selectedMetricPropertiesNames = selectedMetricProperties.map((prop) => prop.value)

            const selectedMetrics = getProperties(groupMetrics, selectedMetricPropertiesNames)

            setMetricDatasets(selectedMetrics)
        }
    }, [groupMetrics, selectedMetricProperties])

    useEffect(() => {
        if (groupStatements && selectedStatementProperties.length > 0) {
            const selectedStatementPropertiesNames = selectedStatementProperties.map(
                (prop) => prop.value
            )

            const selectedStatements = getProperties(
                groupStatements,
                selectedStatementPropertiesNames
            )

            setStatementDatasets(selectedStatements)
        }
    }, [groupStatements, selectedStatementProperties])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (stockLoading || profileLoading || groupMetricsLoading || groupStatementsLoading) {
                handleRetryClick()
            }
        }, 10000) // 10 seconds timeout

        return () => clearTimeout(timeout)
    }, [stockLoading, profileLoading, groupMetricsLoading, groupStatementsLoading])

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

    if (stockLoading || profileLoading || groupMetricsLoading || groupStatementsLoading) {
        console.log('stockLoading ', stockLoading)
        console.log('profileLoading ', profileLoading)
        console.log('groupMetricsLoading ', groupMetricsLoading)
        console.log('groupStatementsLoading ', groupStatementsLoading)
        return (
            <div>
                {getTopButtons()}
                <h2 className="mt-5 ml-5">Loading...</h2>
            </div>
        )
    }

    if (stockError || groupMetricsError || groupStatementsError || profileError) {
        console.log(stockError)
        console.log(profileError)
        console.error('Metrics Error: ', groupMetricsError)
        console.error('Statements Error: ', groupStatementsError)
        return (
            <div>
                {getTopButtons()}
                <div className="mt-5 ml-5">
                    Error:{' '}
                    {String(
                        stockError || groupMetricsError || groupStatementsError || profileError
                    )}
                </div>
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
        <div className="p-4 flex flex-col items-center">
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
            <div className="mb-14">
                <BasicInfoTable
                    marketCap={stock.marketCap}
                    peRatio={stock.pe}
                    roic={groupMetrics?.lastAnnualKeyMetrics?.roic}
                    roe={groupMetrics?.lastAnnualKeyMetrics?.roe}
                    debtToEquity={groupMetrics?.lastAnnualKeyMetrics?.debtToEquity}
                    dateMetrics={groupMetrics?.lastAnnualKeyMetrics?.date}
                    price={stock.price}
                    dcf={stock.dcf} // Fix this
                    date={stock.actualValues.date}
                    capeRatio={stock.actualValues.capeRatio}
                    intrinsicValueZeroGrowth={stock.actualValues.intrinsicValueZeroGrowth}
                    intrinsicValueAverageGrowth={stock.actualValues.intrinsicValueAverageGrowth5y}
                    intrinsicValueLastYearGrowth={stock.actualValues.intrinsicValueLastYearGrowth}
                    peterlynchValue={stock.actualValues.peterlynchValue}
                    sharesOutstanding={stock.actualValues.sharesOutstanding}
                    sharesOutstanding5y={stock.actualValues.sharesOutstanding5y}
                    roe10y={stock.roe5y}
                    roic10y={stock.roic5y}
                    averageProfitGrowth={stock.actualValues.averageProfitGrowth5y}
                    averageDividendGrowth={stock.actualValues.averageDividendGrowth5y}
                    averageNetIncomeGrowth={stock.actualValues.averageNetIncomeGrowth5y}
                    averageProfitMargin={stock.averageProfitMargin}
                    profitMargin={stock.actualValues.averageProfitMargin5y}
                    eps={stock.lastAnnualIncomeStatement.eps}
                    debtPerShare={stock.actualValues.debtPerShare}
                    dividendYield={stock.lastAnnualKeyMetrics.dividendYield}
                    dividendYield10y={stock.actualValues.dividendYield5y}
                    dividendPayoutRatio={stock.actualValues.dividendPayoutRatio5y}
                    freeCashFlowPerShare={stock.lastAnnualKeyMetrics.freeCashFlowPerShare}
                    buybackYield={stock.actualValues.buybackYield}
                    buybackPayoutRatio={stock.buybackPayoutRatio}
                    debtToAssets={stock.lastAnnualKeyMetrics.debtToAssets}
                    netDebtToEBITDA={stock.lastAnnualKeyMetrics.netDebtToEBITDA}
                    similarCompanies={stock.actualValues.similarCompanies}
                    averagePESimilarCompanies={stock.actualValues.averagePESimilarCompanies}
                    yearReturn={stock.yearReturn} // Implement in BE
                />
            </div>

            <StatementTable symbol={stock.symbol} />
            <MetricsTable symbol={stock.symbol} />

            {groupStatements?.incomeStatements &&
                groupStatements?.balanceSheetStatements &&
                groupMetrics?.keyMetrics && (
                    <DetailMetricsTable
                        stockDetail={{
                            incomeStatements: groupStatements.incomeStatements,
                            keyMetrics: groupMetrics.keyMetrics,
                            balanceSheetStatements: groupStatements.balanceSheetStatements,
                        }}
                    />
                )}
            <StockTable symbol={stock.symbol} />
            <div className="my-4 flex flex-col gap-y-10 mt-20">
                <h1 className="text-lg font-semibold text-center">Metrics Graph</h1>
                <Select
                    isMulti
                    options={metricPropertyOptions}
                    onChange={(selectedOptions) =>
                        setSelectedMetricProperties(selectedOptions || [])
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select metric properties to display"
                    value={selectedMetricProperties}
                />
                <div className="h-[300px] w-[800px]">
                    {metricDatasets.length > 0 && <BarChart mergedDatasets={metricDatasets} />}
                </div>
            </div>
            <div className="my-4 flex flex-col gap-y-10 mt-20">
                <h1 className="text-lg font-semibold text-center">Statements Graph</h1>
                <Select
                    isMulti
                    options={statementPropertyOptions}
                    onChange={(selectedOptions) =>
                        setSelectedStatementProperties(selectedOptions || [])
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select statement properties to display"
                    value={selectedStatementProperties}
                />
                <div className="h-[300px] w-[800px]">
                    {statementDatasets.length > 0 && (
                        <BarChart mergedDatasets={statementDatasets} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default StockDetails
