import React from 'react'

interface NewsItemProps {
    title: string
    image: string
    site: string
    text: string
    url: string
    publishedDate: string
}

const NewsItem: React.FC<NewsItemProps> = ({ title, image, site, text, url, publishedDate }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 p-4 border-b">
            <img className="w-80 sm:w-20 sm:h-20 object-cover rounded" src={image} alt={title} />
            <div className="flex-1 mt-2 sm:mt-0">
                <h2 className="text-lg font-semibold">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p className="text-sm text-gray-600">
                    {site} - {new Date(publishedDate).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm">{text}</p>
            </div>
        </div>
    )
}

export default NewsItem
