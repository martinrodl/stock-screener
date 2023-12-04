import { Link } from 'react-router-dom'
import StockFilterForm from '../components/StockFilterForm'
import { Stock } from '../types/Stock'
import { StockCriteria } from '../types/StockCriteria'
import { useFetchStocksMutation } from '../services/stockApi'

const StockList = () => {
    const [fetchStocksss, { data: stocks, isLoading, error }] = useFetchStocksMutation()
    const handleSubmit = (criteria: StockCriteria) => {
        fetchStocksss(criteria)
    }

    const renderStocks = (stocks: Stock[]) => {
        return stocks.map((stock, index) => (
            <Link
                to={`/stock/${stock.symbol}`}
                key={index}
                className="block p-4 border-b border-gray-200"
            >
                <h2 className="text-lg font-semibold">{stock.name}</h2>
                <p className="text-sm text-gray-600">{stock.symbol}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500">
                        Market Cap: ${stock.marketCap?.toLocaleString()}
                    </span>
                    <span className="text-gray-500">P/E Ratio: {stock.peRatio?.toFixed(2)}</span>
                </div>
            </Link>
        ))
    }

    return (
        <div className="flex flex-col items-center md:p-10 p-2">
            <h1 className="text-xl font-bold mb-4">Stocks screener</h1>
            <StockFilterForm onSubmit={handleSubmit} />
            <div className="mt-6">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>Error: {String(error)}</h2>}
                {stocks && !stocks.length && <h2>No stocks found</h2>}
                {stocks && stocks.length && renderStocks(stocks)}
            </div>
        </div>
    )
}

export default StockList
