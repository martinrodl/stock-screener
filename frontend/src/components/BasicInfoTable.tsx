import React from 'react'
import moment from 'moment'
import { formatBigNumber } from '../helpers/formatNumber'

interface BasicInfoProps {
    peRatio?: number
    marketCap?: number
    roic?: number
    roe?: number
    debtToEquity?: number
    dateMetrics?: string
    price?: number
    dcf?: number
    capeRatio?: number
    date?: string
    intrinsicValueZeroGrowth?: number
    intrinsicValueAverageGrowth?: number
    intrinsicValueLastYearGrowth?: number
    peterlynchValue?: number
    sharesOutstanding?: number
    sharesOutstanding5y?: number
    roe10y?: number
    roic10y?: number
    averageProfitGrowth?: number
    averageDividendGrowth?: number
    averageNetIncomeGrowth?: number
    averageProfitMargin?: number
    profitMargin?: number
    eps?: number
    debtPerShare?: number
    dividendYield?: number
    dividendYield10y?: number
    dividendPayoutRatio?: number
    freeCashFlowPerShare?: number
    buybackYield?: number
    buybackPayoutRatio?: number
    debtToAssets?: number
    netDebtToEBITDA?: number
    similarCompanies?: string[]
    averagePESimilarCompanies?: number
    yearReturn?: number
}

const BasicInfoTable: React.FC<BasicInfoProps> = (props) => {
    // Mapping of property keys to display labels and formatting functions
    const dataMapping = [
        { key: 'marketCap', label: 'Market Cap', format: formatBigNumber },
        { key: 'peRatio', label: 'P/E Ratio', format: (n: number) => n?.toFixed(2) },
        { key: 'roic', label: 'ROIC', format: (n: number) => `${(n * 100).toFixed(2)}%` },
        { key: 'roe', label: 'ROE', format: (n: number) => `${(n * 100).toFixed(2)}%` },

        { key: 'price', label: 'Price', format: (n: number) => n?.toFixed(2) },
        { key: 'dcf', label: 'DCF', format: (n: number) => n?.toFixed(2) },
        { key: 'capeRatio', label: 'CAPE Ratio', format: (n: number) => n?.toFixed(2) },

        {
            key: 'intrinsicValueZeroGrowth',
            label: 'Intrinsic Value (Zero Growth)',
            format: (n: number) => n?.toFixed(2),
        },
        {
            key: 'intrinsicValueAverageGrowth',
            label: 'Intrinsic Value (Average Growth)',
            format: (n: number) => n?.toFixed(2),
        },
        {
            key: 'intrinsicValueLastYearGrowth',
            label: 'Intrinsic Value (Last Year Growth)',
            format: (n: number) => n?.toFixed(2),
        },
        {
            key: 'peterlynchValue',
            label: 'Peter Lynch Value',
            format: (n: number) => n?.toFixed(2),
        },
        {
            key: 'yearReturn',
            label: 'Year Return',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        { key: 'sharesOutstanding', label: 'Shares Outstanding', format: formatBigNumber },
        { key: 'sharesOutstanding5y', label: 'Shares Outstanding (5Y)', format: formatBigNumber },
        { key: 'roe10y', label: 'ROE (10Y)', format: (n: number) => `${(n * 100).toFixed(2)}%` },
        { key: 'roic10y', label: 'ROIC (10Y)', format: (n: number) => `${(n * 100).toFixed(2)}%` },
        {
            key: 'averageProfitGrowth',
            label: 'Average Profit Growth',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'averageDividendGrowth',
            label: 'Average Dividend Growth',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'averageNetIncomeGrowth',
            label: 'Average Net Income Growth',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'averageProfitMargin',
            label: 'Average Profit Margin',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'profitMargin',
            label: 'Profit Margin',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        { key: 'eps', label: 'EPS', format: (n: number) => n?.toFixed(2) },
        { key: 'debtPerShare', label: 'Debt Per Share', format: (n: number) => n?.toFixed(2) },
        {
            key: 'dividendYield',
            label: 'Dividend Yield',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'dividendYield10y',
            label: 'Dividend Yield (10Y)',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'dividendPayoutRatio',
            label: 'Dividend Payout Ratio',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'freeCashFlowPerShare',
            label: 'Free Cash Flow Per Share',
            format: (n: number) => n?.toFixed(2),
        },
        {
            key: 'buybackYield',
            label: 'Buyback Yield',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        {
            key: 'buybackPayoutRatio',
            label: 'Buyback Payout Ratio',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
        },
        { key: 'debtToEquity', label: 'Debt to Equity', format: (n: number) => n?.toFixed(2) },
        { key: 'debtToAssets', label: 'Debt to Assets', format: (n: number) => n?.toFixed(2) },
        {
            key: 'netDebtToEBITDA',
            label: 'Net Debt to EBITDA',
            format: (n: number) => n?.toFixed(2),
        },
        {
            key: 'similarCompanies',
            label: 'Similar Companies',
            format: (companies: string[]) => companies?.join(', ') || 'N/A',
        },
        {
            key: 'averagePESimilarCompanies',
            label: 'Average PE (Similar Companies)',
            format: (n: number) => n?.toFixed(2),
        },

        { key: 'dateMetrics', label: 'Date Metrics', format: (d: string) => d || 'N/A' },
        {
            key: 'date',
            label: 'Date',
            format: (d: string) => (d ? moment.unix(parseInt(d)).format('YYYY-MM-DD') : 'N/A'),
        },
    ]

    // Split the data into three columns
    const columns = [
        dataMapping.slice(0, Math.ceil(dataMapping.length / 3)),
        dataMapping.slice(Math.ceil(dataMapping.length / 3), 2 * Math.ceil(dataMapping.length / 3)),
        dataMapping.slice(2 * Math.ceil(dataMapping.length / 3)),
    ]

    // Function to render a single data row
    const renderRow = ({
        key,
        label,
        format,
    }: {
        key: string
        label: string
        format: (n: number | string) => string | number
    }) => (
        <div key={key} className="flex justify-between items-center border-b py-2">
            <span className=" text-sm truncate">{label}:</span>
            <span className="inline-block text-sm truncate ml-2 w-20">
                {props[key] !== undefined ? format(props[key]) : 'N/A'}
            </span>
        </div>
    )

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
