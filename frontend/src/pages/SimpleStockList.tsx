import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import SimpleStockFilterForm from '../components/SimpleStockFilterForm'
import { Stock } from '../types/Stock'
import { SimpleStockCriteria } from '../types/StockCriteria'
import { useFilterControllerApplyFilterDirectlyMutation } from '../services/beGeneratedApi'
import { setSimpleResults } from '../store/stockSlice'
import { RootState } from '../store/RootState'
import { LineStock } from '../components/LineStock'

const pageSize = 20

const SimpleStockList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pageNumber } = useParams<{ pageNumber?: string }>()
    const [page, setPage] = useState<number>(Number(pageNumber) || 1)
    const [fetchStocks, { data, isLoading, error }] =
        useFilterControllerApplyFilterDirectlyMutation()
    const stocks = useSelector((state: RootState) => state.stock.simpleResults.stocks || [])
    const totalResults = useSelector((state: RootState) => state.stock.simpleResults.total || 0)
    const savedStockCriteria = useSelector((state: RootState) => state.stock.simpleCriteria)

    const handleSubmit = (criteria: SimpleStockCriteria) => {
        fetchStocks({
            createFilterDto: { ...criteria, user: '' },
            page, // Pass the page here
            limit: pageSize, // Pass the limit here
        })
    }

    useEffect(() => {
        if (data) {
            dispatch(setSimpleResults(data))
        }
    }, [data, dispatch])

    useEffect(() => {
        navigate(`/stocks/page/${page}`)
        fetchStocks({
            createFilterDto: savedStockCriteria,
            page, // Pass the current page
            limit: pageSize, // Set the limit per page
        })
    }, [fetchStocks, navigate, page, savedStockCriteria])

    const handlePreviousPage = () => {
        setPage((currentPage) => Math.max(currentPage - 1, 1))
    }

    const handleNextPage = () => {
        const maxPage = Math.ceil(totalResults / pageSize)
        setPage((currentPage) => Math.min(currentPage + 1, maxPage))
    }

    const renderPagesButtons = () => {
        const maxPage = Math.ceil(totalResults / pageSize)

        return (
            <div className="flex-1 flex justify-between mb-3">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous page
                </button>
                <span>
                    Page {page} of {maxPage}
                </span>
                <button onClick={handleNextPage} disabled={page >= maxPage}>
                    Next page
                </button>
            </div>
        )
    }

    const renderStocks = (stocks: Stock[]) => {
        return stocks.map((stock, index) => <LineStock key={index} stock={stock} index={index} />)
    }

    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">Simple stocks screener</h1>
            <SimpleStockFilterForm
                savedStockCriteria={savedStockCriteria}
                onSubmit={handleSubmit}
            />
            <div className="mt-6">
                {isLoading && <h2 className="my-2">Loading...</h2>}
                {error && <h2>Error: {String(error)}</h2>}
                {stocks && !stocks.length && <h2>No stocks found</h2>}
                {renderPagesButtons()}
                {stocks && stocks.length > 0 && renderStocks(stocks)}
                {renderPagesButtons()}
            </div>
        </div>
    )
}

export default SimpleStockList
