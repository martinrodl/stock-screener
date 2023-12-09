import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetchPorfolioStockMutation } from '../services/stockApi'
import { Stock } from '../types/Stock'

const portfolioSymbols = [
    'MMM',
    'WBA',
    'AM',
    'OZK',
    'HBI',
    'INTC',
    'PFE',
    'PII',
    'UGI',
    'VZ',
    'WABC',
]

const MyPortfolio = () => {
    const [fetchStocks, { data: stocks, isLoading, error }] = useFetchPorfolioStockMutation()

    useEffect(() => {
        fetchStocks(portfolioSymbols)
    }, [fetchStocks, portfolioSymbols])

    const renderStocks = (stocks: Stock[]) => {
        return stocks.map((stock, index) => (
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
                        <span className="text-gray-500">
                            P/E Ratio: {stock.peRatio?.toFixed(2)}
                        </span>
                    </div>
                </div>
            </Link>
        ))
    }

    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">My Portfolio</h1>
            <div className="mt-6">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>Error: {String(error)}</h2>}
                {stocks && !stocks.length && <h2>No stocks found</h2>}
                {stocks && stocks.length && renderStocks(stocks)}
            </div>
        </div>
    )
}

export default MyPortfolio
