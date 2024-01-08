import React from 'react'
import { useGetStockSureDataQuery } from '../services/stockApi'

import { formatDate } from '../helpers/date'
interface StockTableProps {
    symbol: string
}

const StockTable: React.FC<StockTableProps> = ({ symbol }) => {
    const { data, error, isLoading } = useGetStockSureDataQuery(symbol)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occurred!</div>

    const excludedFields = ['_id', 'createdAt']
    const formattedData = data
        ? Object.entries(data).filter(([key]) => !excludedFields.includes(key))
        : []

    const formatValue = (key: string, value: any) => {
        if (key === 'updatedAt') {
            return formatDate(value.toString())
        } else if (typeof value === 'number') {
            return value.toFixed(2)
        }
        return value.toString()
    }

    return (
        <div className="flex flex-wrap max-w-3xl mt-10">
            <h2 className="text-center w-full text-xl  font-bold mb-2">Sure table</h2>
            {formattedData.map(([key, value], index) => (
                <div key={key} className="flex flex-row w-1/3 p-2">
                    <div className="mr-2">{key}:</div>
                    <div>{formatValue(key, value)}</div>
                </div>
            ))}
        </div>
    )
}

export default StockTable
