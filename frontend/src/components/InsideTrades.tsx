import React, { useState } from 'react'
import { useStocksControllerGetPaginatedInsideTradesQuery } from '../services/beGeneratedApi'

interface InsideTradesProps {
    symbol: string
}

const InsideTrades: React.FC<InsideTradesProps> = ({ symbol }) => {
    const [page, setPage] = useState(1)
    const limit = 10

    const { data, error, isLoading } = useStocksControllerGetPaginatedInsideTradesQuery({
        symbol,
        page,
        limit,
    })

    if (isLoading) {
        return <p>Loading inside trades...</p>
    }

    if (error) {
        return <p>Error loading inside trades: {error.message}</p>
    }

    if (!data || data.trades.length === 0) {
        return <p>No inside trades available.</p>
    }

    const handleNextPage = () => {
        if (page * limit < data.total) {
            setPage(page + 1)
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    return (
        <div className="p-4 bg-white shadow rounded-md overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Latest Inside Trades</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Transaction Date</th>
                        <th className="py-2 px-4 border-b text-left">Reporting Name</th>
                        <th className="py-2 px-4 border-b text-left">Type of Owner</th>
                        <th className="py-2 px-4 border-b text-left">Transaction Type</th>
                        <th className="py-2 px-4 border-b text-left">Securities Transacted</th>
                        <th className="py-2 px-4 border-b text-left">Price</th>
                        <th className="py-2 px-4 border-b text-left">Filing Link</th>
                    </tr>
                </thead>
                <tbody>
                    {data.trades.map((trade) => (
                        <tr key={trade._id}>
                            <td className="py-2 px-4 border-b">
                                {new Date(trade.transactionDate).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b">{trade.reportingName}</td>
                            <td className="py-2 px-4 border-b">{trade.typeOfOwner}</td>
                            <td className="py-2 px-4 border-b">{trade.transactionType}</td>
                            <td className="py-2 px-4 border-b">{trade.securitiesTransacted}</td>
                            <td className="py-2 px-4 border-b">${trade.price.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b">
                                <a
                                    href={trade.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                >
                                    View Filing
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page * limit >= data.total}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default InsideTrades
