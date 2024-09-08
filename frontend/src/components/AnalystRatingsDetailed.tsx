import React, { useEffect } from 'react'
import { useStocksControllerGetAnalystRatingsDetailedQuery } from '../services/beGeneratedApi'

interface AnalystRatingsDetailedProps {
    symbol: string
}

const AnalystRatingsDetailed: React.FC<AnalystRatingsDetailedProps> = ({
    symbol,
    onLoadComplete,
}) => {
    const { data, error, isLoading } = useStocksControllerGetAnalystRatingsDetailedQuery({
        symbol,
        limit: 5, // Fetch the latest 5 detailed ratings
    })

    useEffect(() => {
        if (!isLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, isLoading])

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
                        <th className="py-2 px-4 border-b text-left">Recommendation</th>
                        {data.ratings.map((rating, index) => (
                            <th key={index} className="py-2 px-4 border-b">
                                {new Date(rating.date).toLocaleDateString()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Rating */}
                    <tr>
                        <td className="py-2 px-4 border-b">Overall Rating</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.rating}
                            </td>
                        ))}
                    </tr>

                    {/* Rating Score */}
                    <tr>
                        <td className="py-2 px-4 border-b">Overall Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingScore}
                            </td>
                        ))}
                    </tr>

                    {/* DCF Score and Recommendation */}
                    <tr>
                        <td className="py-2 px-4 border-b">DCF Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsDCFScore}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">DCF Recommendation</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsDCFRecommendation}
                            </td>
                        ))}
                    </tr>

                    {/* ROE Score and Recommendation */}
                    <tr>
                        <td className="py-2 px-4 border-b">ROE Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsROEScore}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">ROE Recommendation</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsROERecommendation}
                            </td>
                        ))}
                    </tr>

                    {/* ROA Score and Recommendation */}
                    <tr>
                        <td className="py-2 px-4 border-b">ROA Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsROAScore}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">ROA Recommendation</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsROARecommendation}
                            </td>
                        ))}
                    </tr>

                    {/* DE Score and Recommendation */}
                    <tr>
                        <td className="py-2 px-4 border-b">DE Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsDEScore}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">DE Recommendation</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsDERecommendation}
                            </td>
                        ))}
                    </tr>

                    {/* PE Score and Recommendation */}
                    <tr>
                        <td className="py-2 px-4 border-b">PE Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsPEScore}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">PE Recommendation</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsPERecommendation}
                            </td>
                        ))}
                    </tr>

                    {/* PB Score and Recommendation */}
                    <tr>
                        <td className="py-2 px-4 border-b">PB Score</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsPBScore}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">PB Recommendation</td>
                        {data.ratings.map((rating, index) => (
                            <td key={index} className="py-2 px-4 border-b">
                                {rating.ratingDetailsPBRecommendation}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AnalystRatingsDetailed
