import React from 'react'
import moment from 'moment'

import { formatBigNumber } from '../helpers/formatNumber'

interface BasicInfoProps {
    peRatio: number | null
    marketCap: number | null
    roic: number | null
    roe: number | null
    debtToEquity: number | null
    dateMetrics: string
    price: number | null
    dcf: number | null
    intrinsicValue: number | null
    date: number
}

const BasicInfoTable: React.FC<BasicInfoProps> = ({
    peRatio,
    marketCap,
    roic,
    roe,
    debtToEquity,
    dateMetrics,
    price,
    dcf,
    intrinsicValue,
    date,
}) => {
    return (
        <div className="flex justify-center border">
            <div className="flex flex-col space-y-5 p-3 rounded-md min-w-[220px] max-w-lg">
                <div className="flex justify-between border-b py-2">
                    <span>P/E Ratio:</span>
                    <span>{peRatio ? peRatio.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Market Cap:</span>
                    <span>{marketCap ? formatBigNumber(marketCap) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>ROIC:</span>
                    <span>{roic ? `${(roic * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>ROE:</span>
                    <span>{roe ? `${(roe * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Debt to Equity:</span>
                    <span>{debtToEquity ? debtToEquity.toFixed(2) : 'N/A'}</span>
                </div>
            </div>
            <div className="flex flex-col space-y-5 p-3 rounded-md min-w-[220px] max-w-lg">
                <div className="flex justify-between border-b py-2">
                    <span>Price:</span>
                    <span>{price ? price.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Discounted cash flow value:</span>
                    <span>{dcf ? dcf.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Grahan intrinsic value:</span>
                    <span>{intrinsicValue ? intrinsicValue.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Date metrics:</span>
                    <span>{dateMetrics ? dateMetrics : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Date:</span>
                    <span>{date ? moment.unix(date).format('YYYY-MM-DD') : 'N/A'}</span>
                </div>
            </div>
        </div>
    )
}

export default BasicInfoTable
