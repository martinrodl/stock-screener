import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEtfControllerGetAllEtFsQuery } from '../services/beGeneratedApi'
import SectorFilter from '../components/filter/SectorFilter'
import SymbolInputForm from '../components/filter/SymbolInputForm'
import { Etf } from '../types/Etf'

const pageSize = 20

const EtfList = () => {
    const navigate = useNavigate()
    const { pageNumber } = useParams<{ pageNumber?: string }>()
    const [page, setPage] = useState<number>(Number(pageNumber) || 1)
    const [sectors, setSectors] = useState<string[]>([])
    const [symbol, setSymbol] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [firstLoad, setFirstLoad] = useState<boolean>(true)

    const { data, isLoading, error, refetch } = useEtfControllerGetAllEtFsQuery({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sortBy,
        sortOrder,
        sector: sectors.join(','),
        symbol, // Include the symbol for filtering
    })

    const handlePreviousPage = () => {
        setPage((currentPage) => Math.max(currentPage - 1, 1))
    }

    const handleNextPage = () => {
        setPage((currentPage) => currentPage + 1)
    }

    const handleSearch = () => {
        setPage(1) // Reset to the first page when searching
        setFirstLoad(false) // Disable firstLoad to allow refetch
        refetch() // Trigger refetch manually
    }

    useEffect(() => {
        if (!firstLoad) {
            refetch() // Only refetch when the firstLoad is false
        }
    }, [page, refetch, firstLoad])

    useEffect(() => {
        navigate(`/etfs/page/${page}`)
    }, [page, navigate])

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

    const renderEtfs = (etfs: Etf[]) => {
        return etfs.map((etf, index) => (
            <div
                key={index}
                className="flex gap-x-2 items-center p-4 border-b border-gray-200"
                onClick={() => navigate(`/etf/${etf.symbol}`)}
            >
                <div className="w-40 mx-3">
                    <h2 className="text-base font-semibold truncate">{etf.name}</h2>
                    <p className="text-sm text-gray-600">{etf.symbol}</p>
                </div>
                <div className="w-40 mr-3">
                    <h2 className="text-base font-semibold truncate">{etf.etfCompany}</h2>
                    <p className="text-sm text-gray-600">{etf.assetClass}</p>
                </div>
                <div className="w-60 flex flex-col justify-between flex-1">
                    <span className="text-gray-500">AUM: ${etf.aum?.toLocaleString()}</span>
                    <div className="w-30 flex gap-x-3 truncate justify-between">
                        <span className="text-gray-500">
                            Expense Ratio: {etf.expenseRatio?.toFixed(2)}%
                        </span>
                    </div>
                </div>
                <div className="w-60 flex flex-col justify-between flex-1">
                    <span className="text-gray-500">1Y: {etf.performance1y?.toFixed(2)}%</span>
                    <span className="text-gray-500">3Y: {etf.performance3y?.toFixed(2)}%</span>
                    <span className="text-gray-500">5Y: {etf.performance5y?.toFixed(2)}%</span>
                    <span className="text-gray-500">10Y: {etf.performance10y?.toFixed(2)}%</span>
                </div>
            </div>
        ))
    }

    return (
        <div className="flex flex-col items-center p-2">
            <h1 className="text-xl font-bold mb-2">ETF List</h1>
            <form
                className="mb-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}
            >
                <div className="flex flex-col gap-2 mb-4">
                    <SymbolInputForm onSymbolChange={setSymbol} initialSymbol={symbol} />
                    <SectorFilter onChange={setSectors} initialValues={sectors} />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 border rounded bg-white text-gray-700"
                    >
                        <option value="">Sort By</option>
                        <option value="expenseRatio">Expense Ratio</option>
                        <option value="performance1y">1Y Performance</option>
                        <option value="performance3y">3Y Performance</option>
                        <option value="performance5y">5Y Performance</option>
                        <option value="performance10y">10Y Performance</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        className="p-2 border rounded bg-white text-gray-700"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>
            <div className="mt-6">
                {isLoading && <h2 className="my-2">Loading...</h2>}
                {error && <h2>Error: {String(error)}</h2>}
                {data?.data && !data.data.length && <h2>No ETFs found</h2>}
                {renderPagesButtons()}
                {data?.data && data.data.length && renderEtfs(data.data)}
                {renderPagesButtons()}
            </div>
        </div>
    )
}

export default EtfList
