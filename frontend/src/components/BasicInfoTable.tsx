import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
            key: 'netIncome',
            label: 'Net Income',
            format: (n: number) => formatBigNumber(n),
            value: stock.lastAnnualIncomeStatement?.netIncome,
        },
        { key: 'price', label: 'Price', format: (n: number) => n?.toFixed(2), source: 'stock' },
        {
            key: 'eps',
            label: 'EPS',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualIncomeStatement',
        },
        {
            key: 'freeCashFlowPerShare',
            label: 'Free Cash Flow Per Share',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'debtPerShare',
            label: 'Debt Per Share',
            format: (n: number) => n?.toFixed(2),
            source: 'stock.actualValues',
        },
        { key: 'pe', label: 'P/E Ratio', format: (n: number) => n?.toFixed(2), source: 'stock' },
        {
            key: 'profitMargin',
            label: 'Profit Margin',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualIncomeStatement',
        },
        {
            key: 'roe',
            label: 'ROE',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'roic',
            label: 'ROIC',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'dividendYield',
            label: 'Dividend Yield',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'payoutRatio',
            label: 'Dividend Payout Ratio',
            format: (n: number) => `${(n * 100).toFixed(2)}%`,
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
        { key: 'dcf', label: 'DCF', format: (n: number) => n?.toFixed(2), source: 'stock.profile' },
        {
            key: 'peterlynchValue',
            label: 'Peter Lynch Value',
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
    ]

    const specialRows = [
        {
            key: 'averagePE',
            label: 'Average PE (Similar Companies)',
            format: (n: number) => n?.toFixed(2),
            value: stock.actualValues?.averagePESimilarCompanies,
        },
        {
            key: 'date',
            label: 'Date',
            format: (d: string) => d,
            source: 'stock.lastAnnualKeyMetrics',
        },
        {
            key: 'similarCompanies',
            label: 'Similar Companies',
            format: (companies: string[]) => {
                if (!companies || companies.length === 0) return 'N/A' // Handle empty array
                return companies
                    .map((company, index) => (
                        <Link
                            to={`/stock/${company}`}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {company}
                        </Link>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr], []) // Provide initial value []
            },
            value: stock.actualValues?.similarCompanies,
            isWide: true, // Custom flag to indicate this row should span two columns
        },
    ]

    const renderRow = ({
        key,
        label,
        format,
        source,
        isWide,
        value,
    }: {
        key: string
        label: string
        format: (n: any) => string | number | JSX.Element[]
        source?:
            | 'stock'
            | 'stock.lastAnnualKeyMetrics'
            | 'stock.actualValues'
            | 'stock.profile'
            | 'stock.lastAnnualIncomeStatement'
        isWide?: boolean
        value?: any
    }) => {
        let rowValue = value !== undefined ? value : null

        if (source && rowValue === null) {
            if (source === 'stock') {
                rowValue = stock[key]
            } else if (source === 'stock.lastAnnualKeyMetrics') {
                rowValue = stock.lastAnnualKeyMetrics?.[key]
            } else if (source === 'stock.actualValues') {
                rowValue = stock.actualValues?.[key]
            } else if (source === 'stock.profile') {
                rowValue = stock.profile?.[key]
            } else if (source === 'stock.lastAnnualIncomeStatement') {
                rowValue = stock.lastAnnualIncomeStatement?.[key]
            }
        }

        // Ensure we handle `null` values gracefully
        const formattedValue = rowValue !== null ? format(rowValue) : 'N/A'

        const labelWidth = isWide ? '18%' : '70%'
        const valueWidth = isWide ? '82%' : '30%'

        return (
            <div
                key={key}
                className={`flex justify-between items-center border-b py-2 px-4 ${
                    isWide ? 'col-span-2' : ''
                }`}
            >
                <span className="text-sm font-medium truncate" style={{ width: labelWidth }}>
                    {label}:
                </span>
                <span
                    className="inline-block text-sm font-normal truncate ml-2"
                    style={{ width: valueWidth }}
                >
                    {formattedValue}
                </span>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">
            {dataMapping.map((item) => renderRow(item))}
            {specialRows.map((row) => renderRow(row))}
        </div>
    )
}

export default BasicInfoTable
