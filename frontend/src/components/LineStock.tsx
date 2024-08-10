import React from 'react'
import { Link } from 'react-router-dom'
import { Stock } from '../types/Stock'

interface LineStockProps {
    stock: Stock
    index: number
}

export const LineStock = ({ stock, index }: LineStockProps) => {
    return (
        <Link
            to={`/stock/${stock.symbol}`}
            key={index}
            className="flex gap-x-2 items-center p-4 border-b border-gray-200"
        >
            <div className="w-40 mx-3">
                <h2 className="text-base font-semibold truncate">{stock.name}</h2>
                <p className="text-sm text-gray-600">{stock.symbol}</p>
            </div>
            <div className="w-40 mr-3">
                <h2 className="text-base font-semibold truncate">{stock.industry}</h2>
                <p className="text-sm text-gray-600">{stock.sector}</p>
            </div>
            <div className="w-60 flex flex-col justify-between flex-1">
                <span className="text-gray-500">
                    Market Cap: ${stock.marketCap?.toLocaleString()}
                </span>
                <div className="w-30 flex gap-x-3 truncate justify-between">
                    <span className="text-gray-500">P/E: {stock.pe?.toFixed(2)}</span>
                    <span className="text-gray-500">Country: {stock.country}</span>
                </div>
            </div>
        </Link>
    )
}
