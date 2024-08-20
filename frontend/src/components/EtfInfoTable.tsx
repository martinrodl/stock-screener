import React from 'react'
import moment from 'moment'
import { formatBigNumber } from '../helpers/formatNumber'

interface EtfInfoProps {
    assetClass?: string
    inceptionDate?: string
    expenseRatio?: number
    avgVolume?: number
    nav?: number
    navCurrency?: string
    aum?: number
    holdingsCount?: number
    domicile?: string
    etfCompany?: string
    isin?: string
    cusip?: string
}

const EtfInfoTable: React.FC<EtfInfoProps> = (props) => {
    // Mapping of property keys to display labels and formatting functions
    const dataMapping = [
        { key: 'assetClass', label: 'Asset Class', format: (n: string) => n || 'N/A' },
        {
            key: 'inceptionDate',
            label: 'Inception Date',
            format: (d: string) => (d ? moment(d).format('YYYY-MM-DD') : 'N/A'),
        },
        { key: 'expenseRatio', label: 'Expense Ratio', format: (n: number) => `${n?.toFixed(2)}%` },
        { key: 'avgVolume', label: 'Average Volume', format: formatBigNumber },
        { key: 'nav', label: 'Net Asset Value (NAV)', format: (n: number) => n?.toFixed(2) },
        { key: 'navCurrency', label: 'NAV Currency', format: (n: string) => n || 'N/A' },
        { key: 'aum', label: 'Assets Under Management (AUM)', format: formatBigNumber },
        { key: 'holdingsCount', label: 'Total Holdings', format: formatBigNumber },
        { key: 'domicile', label: 'Domicile', format: (n: string) => n || 'N/A' },
        { key: 'etfCompany', label: 'ETF Company', format: (n: string) => n || 'N/A' },
        { key: 'isin', label: 'ISIN', format: (n: string) => n || 'N/A' },
        { key: 'cusip', label: 'CUSIP', format: (n: string) => n || 'N/A' },
    ]

    // Split the data into two columns for better readability
    const columns = [
        dataMapping.slice(0, Math.ceil(dataMapping.length / 2)),
        dataMapping.slice(Math.ceil(dataMapping.length / 2)),
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
            <span className="text-sm truncate">{label}:</span>
            <span className="inline-block text-sm truncate ml-2 w-40">
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

export default EtfInfoTable
