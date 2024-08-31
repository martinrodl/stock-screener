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
        <div className="p-4 bg-white shadow rounded-md overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">Latest Detailed Analyst Ratings</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Date</th>
                        <th className="py-2 px-4 border-b text-left">Rating</th>
                        <th className="py-2 px-4 border-b text-left">Score</th>
                        <th className="py-2 px-4 border-b text-left">Recommendation</th>
                        <th className="py-2 px-4 border-b text-left">DCF Score</th>
                        <th className="py-2 px-4 border-b text-left">DCF Recommendation</th>
                        <th className="py-2 px-4 border-b text-left">ROE Score</th>
                        <th className="py-2 px-4 border-b text-left">ROE Recommendation</th>
                        <th className="py-2 px-4 border-b text-left">ROA Score</th>
                        <th className="py-2 px-4 border-b text-left">ROA Recommendation</th>
                        <th className="py-2 px-4 border-b text-left">DE Score</th>
                        <th className="py-2 px-4 border-b text-left">DE Recommendation</th>
                        <th className="py-2 px-4 border-b text-left">PE Score</th>
                        <th className="py-2 px-4 border-b text-left">PE Recommendation</th>
                        <th className="py-2 px-4 border-b text-left">PB Score</th>
                        <th className="py-2 px-4 border-b text-left">PB Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.ratings.map((rating, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">
                                {new Date(rating.date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b">{rating.rating}</td>
                            <td className="py-2 px-4 border-b">{rating.ratingScore}</td>
                            <td className="py-2 px-4 border-b">{rating.ratingRecommendation}</td>
                            <td className="py-2 px-4 border-b">{rating.ratingDetailsDCFScore}</td>
                            <td className="py-2 px-4 border-b">
                                {rating.ratingDetailsDCFRecommendation}
                            </td>
                            <td className="py-2 px-4 border-b">{rating.ratingDetailsROEScore}</td>
                            <td className="py-2 px-4 border-b">
                                {rating.ratingDetailsROERecommendation}
                            </td>
                            <td className="py-2 px-4 border-b">{rating.ratingDetailsROAScore}</td>
                            <td className="py-2 px-4 border-b">
                                {rating.ratingDetailsROARecommendation}
                            </td>
                            <td className="py-2 px-4 border-b">{rating.ratingDetailsDEScore}</td>
                            <td className="py-2 px-4 border-b">
                                {rating.ratingDetailsDERecommendation}
                            </td>
                            <td className="py-2 px-4 border-b">{rating.ratingDetailsPEScore}</td>
                            <td className="py-2 px-4 border-b">
                                {rating.ratingDetailsPERecommendation}
                            </td>
                            <td className="py-2 px-4 border-b">{rating.ratingDetailsPBScore}</td>
                            <td className="py-2 px-4 border-b">
                                {rating.ratingDetailsPBRecommendation}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AnalystRatingsDetailed
