import React from 'react'
import { useStocksControllerGetAnalystRatingsQuery } from '../services/beGeneratedApi'

interface AnalystRatingProps {
    symbol: string
}

const AnalystRatingsSummary: React.FC<AnalystRatingProps> = ({ symbol }) => {
    const { data, error, isLoading } = useStocksControllerGetAnalystRatingsQuery({
        symbol,
        limit: 5,
    })

    if (isLoading) {
        return <p>Loading analyst ratings...</p>
    }

    if (error) {
        return <p>Error loading analyst ratings: {error.message}</p>
    }

    if (!data || !data.ratings || data.ratings.length === 0) {
        return <p>No analyst ratings available.</p>
    }

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Latest Analyst Ratings</h2>
            <ul className="space-y-2">
                {data.ratings.map((rating, index) => (
                    <li key={index} className="border-b border-gray-200 pb-2">
                        <p>
                            <strong>Date:</strong> {new Date(rating.date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Strong Buy:</strong> {rating.analystRatingsStrongBuy}
                        </p>
                        <p>
                            <strong>Buy:</strong> {rating.analystRatingsBuy}
                        </p>
                        <p>
                            <strong>Hold:</strong> {rating.analystRatingsHold}
                        </p>
                        <p>
                            <strong>Sell:</strong> {rating.analystRatingsSell}
                        </p>
                        <p>
                            <strong>Strong Sell:</strong> {rating.analystRatingsStrongSell}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AnalystRatingsSummary
