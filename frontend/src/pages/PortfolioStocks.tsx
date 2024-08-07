import { useState } from 'react'
import {
    useUsersControllerGetPortfolioListQuery,
    useUsersControllerRemoveFromPortfolioMutation,
} from '../services/beGeneratedApi'
import { PortfolioLineStock } from '../components/PortfolioLineStock'
import { useAddStockToPortfolioBySymbolMutation } from '../services/beApi'

const PortfolioStocks = () => {
    const {
        data: stocks,
        isLoading: isLoadingPortfolio,
        error: portfolioError,
        refetch: refetchPortfolio,
    } = useUsersControllerGetPortfolioListQuery()
    const [removeStockFromPortfolio] = useUsersControllerRemoveFromPortfolioMutation()
    const [stockSymbol, setStockSymbol] = useState('')

    const [addStockToPortfolio, { error: fetchError, isLoading: isAdding }] =
        useAddStockToPortfolioBySymbolMutation()

    const handleAddStock = async (e) => {
        e.preventDefault()
        try {
            await addStockToPortfolio({ symbol: stockSymbol }).unwrap()
            setStockSymbol('')
            await refetchPortfolio()
        } catch (error) {
            alert('Stock is not in DB')
        }
    }

    const handleRemoveStock = async (stockId: string) => {
        await removeStockFromPortfolio({ updatePortfolioDto: { stockId } })
        await refetchPortfolio()
    }

    const renderStocks = (stocks) => {
        return stocks.map((stock, index) => (
            <PortfolioLineStock
                key={'portfoliostock' + index}
                stock={stock}
                index={index}
                handleRemoveStock={handleRemoveStock}
            />
        ))
    }

    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">My Portfolio</h1>
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
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Stock
                </button>
            </form>
            {portfolioError && <p className="text-red-500">{String(portfolioError?.message)}</p>}
            <div className="mt-6 w-full">
                {isLoadingPortfolio && <h2>Loading...</h2>}
                {stocks && !stocks.length && <h2>No stocks found</h2>}
                {stocks && stocks.length && renderStocks(stocks)}
            </div>
        </div>
    )
}

export default PortfolioStocks
