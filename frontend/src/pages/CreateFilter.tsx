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
    const { data: filter, refetch: refetchFilter } = useFilterControllerFindOneQuery({
        id: filterId || '',
    })
    const { refetch: refetchUserFilters } = useFilterControllerFindByUserQuery()
    const [fetchStocks, { data, isLoading, error }] =
        useFilterControllerApplyFilterDirectlyMutation()
    const [updateFilter] = useFilterControllerUpdateMutation()
    const [createFilter] = useFilterControllerCreateMutation()
    const [deleteFilter] = useFilterControllerRemoveMutation()
    const stocks = useSelector((state: RootState) => state.stock.simpleResults)

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
                skip: (page - 1) * pageSize,
                limit: pageSize,
            })
        }
    }, [filter, page, fetchStocks])

    useEffect(() => {
        if (data) {
            dispatch(setSimpleResults(data))
        }
    }, [data, dispatch])

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
            skip: 0,
            limit: pageSize,
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
                onDelete={handleDeleteFilter} // Pass handleDeleteFilter as onDelete prop
                filter={filter}
                filterId={filterId} // Pass the filterId here
            />
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

export default CreateFilter
