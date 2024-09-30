import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
    useFilterControllerFindOneQuery,
    useFilterControllerApplyFilterDirectlyMutation,
    useFilterControllerCreateMutation,
    useFilterControllerUpdateMutation,
    useFilterControllerRemoveMutation,
    useFilterControllerFindByUserQuery,
} from '../services/beGeneratedApi'
import { setSimpleResults } from '../store/stockSlice'
import { RootState } from '../store/RootState'
import { LineStock } from '../components/LineStock'
import DynamicFilterForm from '../components/filter/DynamicFilterComponent'

const pageSize = 20

const CreateFilter = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { filterId, pageNumber } = useParams<{ filterId?: string; pageNumber?: string }>()
    const [page, setPage] = useState<number>(Number(pageNumber) || 1)

    // Fetch filter details and stocks
    const { data: filter, refetch: refetchFilter } = useFilterControllerFindOneQuery({
        id: filterId || '',
    })
    const { refetch: refetchUserFilters } = useFilterControllerFindByUserQuery()
    const [fetchStocks, { data, isLoading, error }] =
        useFilterControllerApplyFilterDirectlyMutation()
    const [updateFilter] = useFilterControllerUpdateMutation()
    const [createFilter] = useFilterControllerCreateMutation()
    const [deleteFilter] = useFilterControllerRemoveMutation()

    // Fetch stocks from the store
    const stocks = useSelector((state: RootState) => state.stock.simpleResults.stocks || [])
    const totalResults = useSelector((state: RootState) => state.stock.simpleResults.total || 0)

    // Handle fetching stocks when filter or page changes
    useEffect(() => {
        if (filter) {
            fetchStocks({
                createFilterDto: {
                    numberCriteria: filter.numberCriteria,
                    stringCriteria: filter.stringCriteria,
                    ratioCriteria: filter.ratioCriteria,
                    multiCriteria: filter.multiCriteria,
                    name: filter.name,
                    user: '', // user will be taken from the token
                },
                page, // Correctly pass the page argument
                limit: pageSize, // Limit per page
            })
        }
    }, [filter, page, fetchStocks])

    // Update store with fetched data
    useEffect(() => {
        if (data) {
            dispatch(setSimpleResults(data))
        }
    }, [data, dispatch])

    // Pagination handlers
    const handlePreviousPage = () => {
        setPage((currentPage) => Math.max(currentPage - 1, 1))
    }

    const handleNextPage = () => {
        const maxPage = Math.ceil(totalResults / pageSize)
        setPage((currentPage) => Math.min(currentPage + 1, maxPage))
    }

    // Pagination Controls
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

    const renderStocks = (stocks) => {
        return stocks.map((stock, index) => <LineStock key={index} stock={stock} index={index} />)
    }

    const handleSaveFilter = async (criteria: any) => {
        try {
            if (filterId) {
                const updatedFilter = await updateFilter({
                    id: filterId,
                    createFilterDto: criteria,
                }).unwrap()
                console.log('Filter updated:', updatedFilter)
            } else {
                const newFilter = await createFilter({ createFilterDto: criteria }).unwrap()
                console.log('Filter created:', newFilter)
                navigate(`/filter-stock-list/${newFilter.id}`)
            }
            refetchFilter() // Refetch the filter data to get the latest changes
            refetchUserFilters() // Refetch the user filters
        } catch (error) {
            console.error('Error saving filter:', error)
        }
    }

    const handleApplyFilter = (criteria) => {
        fetchStocks({
            createFilterDto: {
                numberCriteria: criteria.numberCriteria,
                stringCriteria: criteria.stringCriteria,
                ratioCriteria: criteria.ratioCriteria,
                multiCriteria: criteria.multiCriteria,
                name: criteria.name,
            },
            page, // Pass the current page
            limit: pageSize, // Limit per page
        })
    }

    const handleDeleteFilter = async (filterId: string) => {
        try {
            await deleteFilter({ id: filterId }).unwrap()
            console.log('Filter deleted')
            refetchUserFilters() // Refetch the user filters after deleting
            navigate('/user-filters')
        } catch (error) {
            console.error('Error deleting filter:', error)
        }
    }

    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">Dynamic Stocks Screener</h1>
            <DynamicFilterForm
                onSubmit={handleApplyFilter}
                onSave={handleSaveFilter}
                onDelete={handleDeleteFilter}
                filter={filter}
                filterId={filterId}
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

export default CreateFilter
