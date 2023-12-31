import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import StockFilterForm from '../components/StockFilterForm'
import { Stock } from '../types/Stock'
import { StockCriteria } from '../types/StockCriteria'
import { useFetchStocksMutation } from '../services/stockApi'
import { setResults } from '../store/stockSlice'
import { RootState } from '../store/RootState'
import { LineStock } from '../components/LineStock'

const pageSize = 20

const StockList = () => {
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()
    const [fetchStocks, { data, isLoading, error }] = useFetchStocksMutation()
    const stocks = useSelector((state: RootState) => state.stock.results)
    const savedStockCriteria = useSelector((state: RootState) => state.stock.criteria)
    const handleSubmit = (criteria: StockCriteria) => {
        fetchStocks({ criteria, skip: page * pageSize, limit: pageSize })
    }

    useEffect(() => {
        if (data) {
            dispatch(setResults(data))
        }
    }, [data, dispatch])

    useEffect(() => {
        fetchStocks({ criteria: savedStockCriteria, skip: page * pageSize, limit: pageSize })
    }, [fetchStocks, page, savedStockCriteria])

    const handlePreviousPage = () => {
        setPage((currentPage) => Math.max(currentPage - 1, 1))
    }

    const handleNextPage = () => {
        setPage((currentPage) => currentPage + 1)
    }

    const renderPagesButtons = () => {
        return (
            <div className="flex-1 flex justify-between mb-3">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous page
                </button>
                <button onClick={handleNextPage}>Next page</button>
            </div>
        )
    }

    const renderStocks = (stocks: Stock[]) => {
        return stocks.map((stock, index) => <LineStock key={index} stock={stock} index={index} />)
    }
    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">Stocks screener - not working properly yet</h1>
            <StockFilterForm savedStockCriteria={savedStockCriteria} onSubmit={handleSubmit} />
            <div className="mt-6">
                {isLoading && <h2 className="my-2">Loading...</h2>}
                {error && <h2>Error: {String(error)}</h2>}
                {stocks && !stocks.length && <h2>No stocks found</h2>}
                {renderPagesButtons()}
                {stocks && stocks.length && renderStocks(stocks)}
                {renderPagesButtons()}
            </div>
        </div>
    )
}

export default StockList
