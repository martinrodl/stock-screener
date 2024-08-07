import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useFilterControllerFindByUser2Query } from '../services/beApi'
import { useFilterControllerFindByUserQuery } from '../services/beGeneratedApi'

const UserFiltersPage: React.FC = () => {
    const navigate = useNavigate()
    const { data: filters, isLoading, error } = useFilterControllerFindByUserQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading filters</div>
    }

    const handleFilterClick = (filterId: string) => {
        navigate(`/filter-stock-list/${filterId}`)
    }

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {filters?.map((filter) => (
                <div
                    key={filter.id}
                    className="bg-gray-200 p-4 rounded shadow cursor-pointer w-48 h-48 flex items-center justify-center"
                    onClick={() => handleFilterClick(filter.id)}
                >
                    <span className="text-xl">{filter.name}</span>
                </div>
            ))}
        </div>
    )
}

export default UserFiltersPage
