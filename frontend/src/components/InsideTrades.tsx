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
        <div className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Latest Inside Trades</h2>
            <ul className="space-y-2">
                {data.trades.map((trade) => (
                    <li key={trade._id} className="border-b border-gray-200 pb-2">
                        <p>
                            <strong>Transaction Date:</strong>{' '}
                            {new Date(trade.transactionDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Reporting Name:</strong> {trade.reportingName}
                        </p>
                        <p>
                            <strong>Type of Owner:</strong> {trade.typeOfOwner}
                        </p>
                        <p>
                            <strong>Transaction Type:</strong> {trade.transactionType}
                        </p>
                        <p>
                            <strong>Securities Transacted:</strong> {trade.securitiesTransacted}
                        </p>
                        <p>
                            <strong>Price:</strong> ${trade.price.toFixed(2)}
                        </p>
                        <a
                            href={trade.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            View Filing
                        </a>
                    </li>
                ))}
            </ul>
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
