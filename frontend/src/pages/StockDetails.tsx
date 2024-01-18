import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BarChart from '../components/BarChart'
import BasicInfoTable from '../components/BasicInfoTable'
import DetailMetricsTable from '../components/DetailMetricsTable'
import StockTable from '../components/SureTable'
import { useGetStockDetailQuery, useUpdateStockValuesMutation } from '../services/stockApi'
import { getProperties } from '../helpers/getPropertyData'
import { mergeDataSets } from '../helpers/mergeDatasets'
import { useEffect } from 'react'
import { delay } from '../helpers/delay'

const StockDetails = () => {
    const [datasets, setDatasets] = useState<any[]>([])
    const [datasets2, setDatasets2] = useState<any[]>([])
    const { symbol } = useParams()
    const navigate = useNavigate()
    const { data: stock, error, isLoading, refetch } = useGetStockDetailQuery(symbol ?? '')
    const [updateStockValues, { isLoading: updateLoading }] = useUpdateStockValuesMutation()

    const handleBackButtonClick = () => {
        navigate(-1) // Navigates back to the last page in history
    }

    const handleUpdateButtonClick = async () => {
        try {
            await updateStockValues(symbol ?? '').unwrap()
            delay(2000)
            refetch()
        } catch (error) {
            console.error('Failed to update stock values:', error)
        }
    }

    useEffect(() => {
        if (stock) {
            const inventory = getProperties(stock, 'cashflowStatements', ['netIncome'])
            const revenue = getProperties(stock, 'incomeStatements', ['revenue'])
            const mergedDataSets = mergeDataSets(inventory, revenue)
            setDatasets(mergedDataSets)

            const growthNetIncome = getProperties(stock, 'growthCashflowtMetrics', [
                'growthNetIncome',
            ])
            const growthRevenue = getProperties(stock, 'growthIncomeMetrics', [
                'growthRevenue',
                'growthInventory',
            ])
            const mergedDataSets2 = mergeDataSets(growthNetIncome, growthRevenue)
            setDatasets2(mergedDataSets2)
        }
    }, [stock])

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
        </div>
    )

    if (isLoading || updateLoading) {
        return (
            <div>
                {getTopButtons()}
                <h2 className="mt-5 ml-5">Loading...</h2>
            </div>
        )
    }
    if (error)
        return (
            <div>
                {getTopButtons()}
                <div className="mt-5 ml-5">Error: {String(error)}</div>
            </div>
        )
    if (!stock)
        return (
            <div>
                {getTopButtons()}
                <h2 className="mt-5 ml-5">Stock not found</h2>
            </div>
        )
    console.log(stock)
    return (
        <div className="p-4 flex flex-col items-center">
            {getTopButtons()}
            <div className="flex gap-x-3 items-center mb-4">
                <h1 className="text-xl font-bold">
                    {stock.name} ({stock.symbol})
                </h1>
                <p>Exchange: {stock.values.exchange}</p>
            </div>
            <div className="flex flex-col gap-y-1 my-2">
                <h3 className="font-semibold">Description:</h3>
                <p className="text-sm">{stock.outlookData.description}</p>
                <div className="flex flex-col">
                    <h3 className="">Sector: {stock.outlookData.sector}</h3>
                    <h3 className="">Inudstry: {stock.outlookData.industry}</h3>
                    <h3 className="">Country: {stock.outlookData.country}</h3>
                </div>
            </div>
            <div className="mb-14">
                <BasicInfoTable
                    marketCap={stock.values.marketCap}
                    peRatio={stock.values.peRatio}
                    roic={stock.keyMetrics[0]?.roic || NaN}
                    roe={stock.keyMetrics[0]?.roe || NaN}
                    debtToEquity={stock.keyMetrics[0]?.debtToEquity || NaN}
                    dateMetrics={stock.keyMetrics[0]?.date}
                    price={stock.values.price}
                    dcf={stock.values.dcf}
                    date={stock.values.date}
                    capeRatio={stock.values.capeRatio}
                    intrinsicValueZeroGrowth={stock.values.intrinsicValueZeroGrowth}
                    intrinsicValueAverageGrowth={stock.values.intrinsicValueAverageGrowth}
                    intrinsicValueLastYearGrowth={stock.values.intrinsicValueLastYearGrowth}
                    peterlynchValue={stock.values.peterlynchValue}
                    sharesOutstanding={stock.values.sharesOutstanding}
                    sharesOutstanding5y={stock.values.sharesOutstanding5y}
                    roe10y={stock.values.roe10y}
                    roic10y={stock.values.roic10y}
                    averageProfitGrowth={stock.values.averageProfitGrowth}
                    averageDividendGrowth={stock.values.averageDividendGrowth}
                    averageNetIncomeGrowth={stock.values.averageNetIncomeGrowth}
                    averageProfitMargin={stock.values.averageProfitMargin}
                    profitMargin={stock.values.profitMargin}
                    eps={stock.values.eps}
                    debtPerShare={stock.values.debtPerShare}
                    dividendYield={stock.values.dividendYield}
                    dividendYield10y={stock.values.dividendYield10y}
                    dividendPayoutRatio={stock.values.dividendPayoutRatio}
                    freeCashFlowPerShare={stock.values.freeCashFlowPerShare}
                    buybackYield={stock.values.buybackYield}
                    buybackPayoutRatio={stock.values.buybackPayoutRatio}
                    debtToAssets={stock.values.debtToAssets}
                    netDebtToEBITDA={stock.values.netDebtToEBITDA}
                    similarCompanies={stock.values.similarCompanies}
                    averagePESimilarCompanies={stock.values.averagePESimilarCompanies}
                    yearReturn={stock.values.yearReturn}
                />
            </div>

            <DetailMetricsTable stockDetail={stock} />
            <StockTable symbol={stock.symbol} />
            <div className="my-4 flex flex-col gap-y-10 mt-20">
                <h1 className="text-lg font-semibold text-center">Growth Metrics Graph</h1>
                <div className="h-[300px] w-[800px]">
                    {stock && datasets.length > 0 && <BarChart mergedDatasets={datasets} />}
                </div>
                <div className="h-[300px] w-[800px]">
                    {stock && datasets.length > 0 && (
                        <BarChart mergedDatasets={datasets2} maxValue={1} />
                    )}
                </div>
                StockTable
            </div>
        </div>
    )
}

export default StockDetails
