import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BarChart from '../components/BarChart'
import BasicInfoTable from '../components/BasicInfoTable'
import DetailMetricsTable from '../components/DetailMetricsTable'
import { useGetStockDetailQuery } from '../services/stockApi'
import { getProperties } from '../helpers/getPropertyData'
import { mergeDataSets } from '../helpers/mergeDatasets'
import { useEffect } from 'react'

const StockDetails = () => {
    const [datasets, setDatasets] = useState<any[]>([])
    const [datasets2, setDatasets2] = useState<any[]>([])

    const { symbol } = useParams()
    const navigate = useNavigate()
    const { data: stock, error, isLoading } = useGetStockDetailQuery(symbol ?? '')
    const handleBackButtonClick = () => {
        navigate('/')
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

    if (!stock || isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) return <div>Error: {String(error)}</div>

    return (
        <div className="p-4 flex flex-col items-center">
            <button
                onClick={handleBackButtonClick}
                className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Back to Stocks
            </button>
            <div className="flex gap-x-3 items-center mb-4">
                <h1 className="text-xl font-bold">
                    {stock.name} ({stock.symbol})
                </h1>
                <p>Exchange: {stock.exchange}</p>
            </div>
            <div className="mb-4">
                <BasicInfoTable
                    marketCap={stock.values.marketCap}
                    peRatio={stock.values.peRatio}
                    roic={stock.keyMetrics[0]?.roic || NaN}
                    roe={stock.keyMetrics[0]?.roe || NaN}
                    debtToEquity={stock.keyMetrics[0]?.debtToEquity || NaN}
                    dateMetrics={stock.keyMetrics[0]?.date}
                    price={stock.values.price}
                    dcf={stock.values.dcf}
                    intrinsicValue={stock.values.intrinsicValue}
                    date={stock.values.date}
                />
            </div>

            <DetailMetricsTable stockDetail={stock} />

            <div className="my-4 flex flex-col gap-y-10">
                <h1 className="text-lg font-semibold text-center">Growth Metrics Graph</h1>
                <div className="h-[300px] w-[500px]">
                    {stock && datasets.length > 0 && <BarChart mergedDatasets={datasets} />}
                </div>
                <div className="h-[300px] w-[500px]">
                    {stock && datasets.length > 0 && (
                        <BarChart mergedDatasets={datasets2} maxValue={1} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default StockDetails
