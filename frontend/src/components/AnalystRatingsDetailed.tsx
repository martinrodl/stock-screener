import React from 'react'
import { useStocksControllerGetAnalystRatingsDetailedQuery } from '../services/beGeneratedApi'

interface AnalystRatingsDetailedProps {
    symbol: string
}

const AnalystRatingsDetailed: React.FC<AnalystRatingsDetailedProps> = ({ symbol }) => {
    const { data, error, isLoading } = useStocksControllerGetAnalystRatingsDetailedQuery({
        symbol,
        limit: 5, // Fetch the latest 5 detailed ratings
    })

    if (isLoading) {
        return <p>Loading detailed analyst ratings...</p>
    }

    if (error) {
        return <p>Error loading detailed analyst ratings: {error.message}</p>
    }

    if (!data || data.ratings.length === 0) {
        return <p>No detailed analyst ratings available.</p>
    }

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">Latest Detailed Analyst Ratings</h2>
            <ul className="space-y-2">
                {data.ratings.map((rating, index) => (
                    <li key={index} className="border-b border-gray-200 pb-2">
                        <p>
                            <strong>Date:</strong> {new Date(rating.date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Rating:</strong> {rating.rating}
                        </p>
                        <p>
                            <strong>Score:</strong> {rating.ratingScore}
                        </p>
                        <p>
                            <strong>Recommendation:</strong> {rating.ratingRecommendation}
                        </p>
                        <p>
                            <strong>DCF Score:</strong> {rating.ratingDetailsDCFScore}
                        </p>
                        <p>
                            <strong>DCF Recommendation:</strong>{' '}
                            {rating.ratingDetailsDCFRecommendation}
                        </p>
                        <p>
                            <strong>ROE Score:</strong> {rating.ratingDetailsROEScore}
                        </p>
                        <p>
                            <strong>ROE Recommendation:</strong>{' '}
                            {rating.ratingDetailsROERecommendation}
                        </p>
                        <p>
                            <strong>ROA Score:</strong> {rating.ratingDetailsROAScore}
                        </p>
                        <p>
                            <strong>ROA Recommendation:</strong>{' '}
                            {rating.ratingDetailsROARecommendation}
                        </p>
                        <p>
                            <strong>DE Score:</strong> {rating.ratingDetailsDEScore}
                        </p>
                        <p>
                            <strong>DE Recommendation:</strong>{' '}
                            {rating.ratingDetailsDERecommendation}
                        </p>
                        <p>
                            <strong>PE Score:</strong> {rating.ratingDetailsPEScore}
                        </p>
                        <p>
                            <strong>PE Recommendation:</strong>{' '}
                            {rating.ratingDetailsPERecommendation}
                        </p>
                        <p>
                            <strong>PB Score:</strong> {rating.ratingDetailsPBScore}
                        </p>
                        <p>
                            <strong>PB Recommendation:</strong>{' '}
                            {rating.ratingDetailsPBRecommendation}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AnalystRatingsDetailed
