import { useState } from 'react'
import {
    useUsersControllerGetConsiderListQuery,
    useUsersControllerRemoveFromConsiderMutation,
} from '../services/beGeneratedApi'
import { PortfolioLineStock } from '../components/PortfolioLineStock'
import { useAddStockToConsiderBySymbolMutation } from '../services/beApi'

const ConsiderStocks = () => {
    const { data: stocks, isLoading, error, refetch } = useUsersControllerGetConsiderListQuery()
    const [removeStockFromConsider] = useUsersControllerRemoveFromConsiderMutation()
    const [stockSymbol, setStockSymbol] = useState('')
    const [addStockToConsider, { error: fetchError, isLoading: isAdding }] =
        useAddStockToConsiderBySymbolMutation()

    const handleAddStock = async (e) => {
        e.preventDefault()
        try {
            await addStockToConsider({ symbol: stockSymbol }).unwrap()
            setStockSymbol('')
            await refetch()
        } catch (error) {
            alert('Stock is not in DB')
        }
    }

    const handleRemoveStock = async (stockId: string) => {
        await removeStockFromConsider({ updateConsiderDto: { stockId } })
        await refetch()
    }

    console.log('stocks ', stocks)

    const renderStocks = (stocks) => {
        return stocks.map((stock, index) => (
            <PortfolioLineStock
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
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                    className="border p-2 mr-2"
                />
                {fetchError && <h2>Error: {String(fetchError?.message)}</h2>}
                <button
                    type="submit"
                    disabled={isAdding}
                    className="bg-blue-500 text-white px-4 py-2 rounded" // Fixed the string constant here
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

export default ConsiderStocks
