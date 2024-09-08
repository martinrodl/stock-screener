import React, { useEffect } from 'react'
import moment from 'moment'
import { formatBigNumber } from '../helpers/formatNumber'
import { useStocksControllerGetStockQuery } from '../services/beGeneratedApi'

interface BasicInfoProps {
    symbol: string
    onLoadComplete: () => void
}

const BasicInfoTable: React.FC<BasicInfoProps> = ({ symbol, onLoadComplete }) => {
    const {
        data: stock,
        error: stockError,
        isLoading: stockLoading,
    } = useStocksControllerGetStockQuery({ symbol })

    useEffect(() => {
        if (!stockLoading) {
            onLoadComplete()
        }
    }, [stockLoading, onLoadComplete])

    if (stockLoading) {
        return <p>Loading basic info...</p>
    }

    if (stockError) {
        return <p>Error loading basic info: {String(stockError)}</p>
    }

    if (!stock || !stock.lastAnnualKeyMetrics) {
        return <p>No basic info available.</p>
    }

    const dataMapping = [
        { key: 'marketCap', label: 'Market Cap', format: formatBigNumber, source: 'stock' },
        {
            key: 'pe',
            label: 'P/E Ratio',
            format: (n: number) => n?.toFixed(2),
            source: 'stock',
        },
        {
            key: 'roic',
            label: 'ROIC',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'roe',
            label: 'ROE',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        { key: 'price', label: 'Price', format: (n: number) => n?.toFixed(2), source: 'stock' },
        {
            key: 'dcf',
            label: 'DCF',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.profile',
        },
        {
            key: 'capeRatio',
            label: 'CAPE Ratio',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'intrinsicValueZeroGrowth',
            label: 'Intrinsic Value (Zero Growth)',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'intrinsicValueAverageGrowth5y',
            label: 'Intrinsic Value (Average Growth 5Y)',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'intrinsicValueLastYearGrowth',
            label: 'Intrinsic Value (Last Year Growth)',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'peterlynchValue',
            label: 'Peter Lynch Value',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'yearReturn',
            label: 'Year Return',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'sharesOutstanding',
            label: 'Shares Outstanding',
            format: formatBigNumber,
            source: 'stock.actualValues',
        },
        {
            key: 'sharesOutstanding5y',
            label: 'Shares Outstanding (5Y)',
            format: formatBigNumber,
            source: 'stock.actualValues',
        },
        {
            key: 'roe5y',
            label: 'ROE (5Y)',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'roic5y',
            label: 'ROIC (5Y)',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'averageProfitGrowth5y',
            label: 'Average Profit Growth 5Y',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'averageDividendGrowth5y',
            label: 'Average Dividend Growth 5Y',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'averageNetIncomeGrowth5y',
            label: 'Average Net Income Growth 5Y',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'averageProfitMargin5y',
            label: 'Average Profit Margin 5Y',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'netIncomeRatio',
            label: 'Profit Margin',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualIncomeStatement',
        },
        {
            key: 'eps',
            label: 'EPS',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualIncomeStatement',
        },
        {
            key: 'debtPerShare',
            label: 'Debt Per Share',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'dividendYield',
            label: 'Dividend Yield',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'dividendYield5y',
            label: 'Dividend Yield (5Y)',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'payoutRatio',
            label: 'Dividend Payout Ratio',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'dividendPayoutRatio5y',
            label: 'Dividend Payout Ratio (5Y)',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'freeCashFlowPerShare',
            label: 'Free Cash Flow Per Share',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'buybackYield',
            label: 'Buyback Yield',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.actualValues',
        },
        {
            key: 'buybackPayoutRatio',
            label: 'Buyback Payout Ratio',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'debtToEquity',
            label: 'Debt to Equity',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'debtToAssets',
            label: 'Debt to Assets',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'netDebtToEBITDA',
            label: 'Net Debt to EBITDA',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'similarCompanies',
            label: 'Similar Companies',
            format: (companies: string[]) => companies?.join(', ') || 'N/A',
            source: 'stock.actualValues',
        },
        {
            key: 'averagePESimilarCompanies',
            label: 'Average PE (Similar Companies)',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        {
            key: 'date',
            label: 'Date Metrics',
            format: (d: string) => d || 'N/A',
            source: 'stock.lastAnnualKeyMetrics',
        },
        // {
        //     key: 'date',
        //     label: 'Date',
        //     format: (d: string) => (d ? moment.unix(parseInt(d)).format('YYYY-MM-DD') : 'N/A'),
        //     source: 'stock.lastAnnualKeyMetrics',
        // },
    ]

    // Split the data into three columns
    const columns = [
        dataMapping.slice(0, Math.ceil(dataMapping.length / 2)),
        dataMapping.slice(Math.ceil(dataMapping.length / 2)),
    ]

    // Function to render a single data row
    const renderRow = ({
        key,
        label,
        format,
        source,
    }: {
        key: string
        label: string
        format: (n: number | string) => string | number
        source: 'stock' | 'stock.lastAnnualKeyMetrics'
    }) => {
        let value

        // Check if the source is stock, or stock.lastAnnualKeyMetrics
        if (source === 'stock') {
            value = stock[key]
        } else if (source === 'stock.lastAnnualKeyMetrics') {
            value = stock.lastAnnualKeyMetrics?.[key]
        } else if (source === 'stock.actualValues') {
            value = stock.actualValues?.[key]
        } else if (source === 'stock.profile') {
            value = stock.profile?.[key]
        } else if (source === 'stock.lastAnnualIncomeStatement') {
            value = stock.lastAnnualIncomeStatement?.[key]
        }

        return (
            <div key={key} className="flex justify-between items-center border-b py-2">
                <span className="text-sm truncate">{label}:</span>
                <span className="inline-block text-sm truncate ml-2 w-20">
                    {value !== undefined ? format(value) : 'N/A'}
                </span>
            </div>
        )
    }

    return (
        <div className="flex justify-center border">
            {columns.map((column, index) => (
                <div key={index} className="flex flex-col flex-grow space-y-2 p-3 rounded-md">
                    {column.map((item) => renderRow(item))}
                </div>
            ))}
        </div>
    )
}

export default BasicInfoTable
