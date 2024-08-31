import React from 'react'
import { useStocksControllerGetStockActualValuesQuery } from '../services/beGeneratedApi'

interface ActualValuesTableProps {
    symbol: string
}

const ActualValuesTable: React.FC<ActualValuesTableProps> = ({ symbol }) => {
    const {
        data: actualValues,
        isLoading,
        error,
    } = useStocksControllerGetStockActualValuesQuery({ symbol })

    if (isLoading) {
        return <p>Loading actual values...</p>
    }

    if (error) {
        return <p>Error loading actual values: {String(error)}</p>
    }

    if (!actualValues) {
        return <p>No actual values available.</p>
    }

    return (
        <div className="my-8">
            <h2 className="text-xl font-semibold mb-4">Actual Values</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Metric
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(actualValues).map(([key, value]) => (
                        <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {key}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {Array.isArray(value) ? value.join(', ') : value?.toString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ActualValuesTable
