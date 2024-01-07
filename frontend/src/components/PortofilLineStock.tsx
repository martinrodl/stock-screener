import { Link } from 'react-router-dom'
import { Stock } from '../types/Stock'

interface PortofilLineStockProps {
    stock: Stock
    index: number
    handleRemoveStock: (symbol: string) => void
}

export const PortofilLineStock = ({ stock, index, handleRemoveStock }: PortofilLineStockProps) => {
    return (
        <div key={index} className="flex justify-between items-center p-4 border-b border-gray-200">
            <Link to={`/stock/${stock.symbol}`} className="flex gap-x-2 items-center">
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
            <button
                onClick={() => handleRemoveStock(stock.symbol)}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Remove
            </button>
        </div>
    )
}
