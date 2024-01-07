import { useState } from 'react'

import {
    useGetAllConsiderStocksQuery,
    useAddStockToConsiderMutation,
    useRemoveStockFromConsiderMutation,
} from '../services/stockApi'
import { Stock } from '../types/Stock'
import { PortofilLineStock } from '../components/PortofilLineStock'

const MyPortfolio = () => {
    const { data: stocks, isLoading, error, refetch } = useGetAllConsiderStocksQuery('')
    const [addStockToPortfolio, { isLoading: isAdding }] = useAddStockToConsiderMutation()
    const [removeStockFromPortfolio] = useRemoveStockFromConsiderMutation()

    const [newStockSymbol, setNewStockSymbol] = useState('')

    const handleAddStock = async (e) => {
        e.preventDefault()
        if (newStockSymbol) {
            await addStockToPortfolio(newStockSymbol)
            setNewStockSymbol('')
            await refetch()
        }
    }

    const handleRemoveStock = async (symbol) => {
        await removeStockFromPortfolio(symbol)
        await refetch()
    }

    const renderStocks = (stocks: Stock[]) => {
        return stocks.map((stock, index) => (
            <PortofilLineStock
                key={'considerstock' + index}
                stock={stock}
                index={index}
                handleRemoveStock={handleRemoveStock}
            />
        ))
    }
    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">Consider stocks</h1>
            <form onSubmit={handleAddStock} className="mb-4">
                <input
                    type="text"
                    value={newStockSymbol}
                    onChange={(e) => setNewStockSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                    className="border p-2 mr-2"
                />
                <button
                    type="submit"
                    disabled={isAdding}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Stock
                </button>
            </form>
            <div className="mt-6 w-full">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>Error: {String(error)}</h2>}
                {stocks && !stocks.length && <h2>No stocks found</h2>}
                {stocks && stocks.length && renderStocks(stocks)}
            </div>
        </div>
    )
}

export default MyPortfolio
