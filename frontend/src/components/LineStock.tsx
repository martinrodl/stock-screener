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
            <div className="w-80">
                <h2 className="text-base font-semibold truncate">{stock.name}</h2>
                <p className="text-sm text-gray-600">{stock.symbol}</p>
            </div>
            <div className="w-60 flex flex-col justify-between flex-1">
                <span className="text-gray-500">
                    Market Cap: ${stock.marketCap?.toLocaleString()}
                </span>
                <div className="w-30 flex flex-start">
                    <span className="text-gray-500">P/E Ratio: {stock.peRatio?.toFixed(2)}</span>
                </div>
            </div>
        </Link>
    )
}
