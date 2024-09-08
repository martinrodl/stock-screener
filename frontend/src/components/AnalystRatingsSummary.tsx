import React, { useEffect } from 'react'
import { useStocksControllerGetAnalystRatingsQuery } from '../services/beGeneratedApi'

interface AnalystRatingProps {
    symbol: string
}

const AnalystRatingsSummary: React.FC<AnalystRatingProps> = ({ symbol, onLoadComplete }) => {
    const { data, error, isLoading } = useStocksControllerGetAnalystRatingsQuery({
        symbol,
        limit: 5,
    })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Date</th>
                            <th className="py-2 px-4 border-b text-left">Strong Buy</th>
                            <th className="py-2 px-4 border-b text-left">Buy</th>
                            <th className="py-2 px-4 border-b text-left">Hold</th>
                            <th className="py-2 px-4 border-b text-left">Sell</th>
                            <th className="py-2 px-4 border-b text-left">Strong Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.ratings.map((rating, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">
                                    {new Date(rating.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {rating.analystRatingsStrongBuy}
                                </td>
                                <td className="py-2 px-4 border-b">{rating.analystRatingsBuy}</td>
                                <td className="py-2 px-4 border-b">{rating.analystRatingsHold}</td>
                                <td className="py-2 px-4 border-b">{rating.analystRatingsSell}</td>
                                <td className="py-2 px-4 border-b">
                                    {rating.analystRatingsStrongSell}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AnalystRatingsSummary
