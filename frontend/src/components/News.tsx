import React, { useState } from 'react'
import { useStocksControllerGetStockNewsQuery } from '../services/beGeneratedApi'
import NewsItem from './NewsItem'

interface NewsProps {
    symbol: string
}

const News: React.FC<NewsProps> = ({ symbol }) => {
    const [page, setPage] = useState(1)
    const [limit] = useState(5) // Number of news items per page

    const {
        data: news,
        isLoading,
        error,
    } = useStocksControllerGetStockNewsQuery({
        symbol: symbol ?? '',
        page,
        limit,
    })

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1)
    }

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    if (isLoading) {
        return <p>Loading news...</p>
    }

    if (error) {
        return <p>Error loading news: {String(error)}</p>
    }

    if (!news || news.length === 0) {
        return <p>No news available.</p>
    }

    return (
        <div className="my-8">
            <h2 className="text-xl font-semibold mb-4">Latest News</h2>
            <div className="space-y-4">
                {news.map((item) => (
                    <NewsItem
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        site={item.site}
                        text={item.text}
                        url={item.url}
                        publishedDate={item.publishedDate}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button onClick={handleNextPage} className="px-4 py-2 bg-gray-200 rounded">
                    Next
                </button>
            </div>
        </div>
    )
}

export default News
