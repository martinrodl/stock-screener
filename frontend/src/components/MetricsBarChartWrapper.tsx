import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import BarChart from './BarChart'
import { useStocksControllerGetGroupMetricsQuery } from '../services/beGeneratedApi'
import { getProperties } from '../helpers/getPropertyData'

interface MetricsBarChartWrapperProps {
    symbol: string
    initialSelectedProperties?: { value: string; label: string }[]
    onLoadComplete: () => void
}

const MetricsBarChartWrapper: React.FC<MetricsBarChartWrapperProps> = ({
    symbol,
    initialSelectedProperties,
    onLoadComplete,
}) => {
    const [metricDatasets, setMetricDatasets] = useState<any[]>([])
    const [selectedMetricProperties, setSelectedMetricProperties] = useState(
        initialSelectedProperties || []
    )
    const [metricPropertyOptions, setMetricPropertyOptions] = useState<any[]>([])
    const [periodType, setPeriodType] = useState('annual') // State for period type (annual/quarter)

    const {
        data: groupMetrics,
        error: groupMetricsError,
        isLoading: groupMetricsLoading,
        refetch: refetchGroupMetrics, // Function to retry fetching data
    } = useStocksControllerGetGroupMetricsQuery({ symbol, periodType, limit: 10 })

    useEffect(() => {
        if (!groupMetricsLoading) {
            onLoadComplete()
        }
    }, [groupMetricsLoading, onLoadComplete])

    useEffect(() => {
        const extractKeys = (data: any[]) => {
            const keys = new Set<string>()
            data.forEach((item) => {
                Object.keys(item).forEach((key) => keys.add(key))
            })
            return Array.from(keys).filter(
                (key) => !['date', 'period', 'calendarYear'].includes(key)
            )
        }

        if (groupMetrics) {
            const metricKeys = extractKeys(groupMetrics)
            const metricOptions = metricKeys.map((key) => ({ value: key, label: key }))
            setMetricPropertyOptions(metricOptions)

            // If initial properties are set, use them
            if (initialSelectedProperties) {
                const selectedProperties = getProperties(
                    groupMetrics,
                    initialSelectedProperties.map((prop) => prop.value)
                )
                setMetricDatasets(selectedProperties)
            }
        }
    }, [groupMetrics, initialSelectedProperties])

    useEffect(() => {
        if (groupMetrics && selectedMetricProperties.length > 0) {
            const selectedMetricPropertyNames = selectedMetricProperties.map((prop) => prop.value)
            const selectedMetrics = getProperties(groupMetrics, selectedMetricPropertyNames)
            setMetricDatasets(selectedMetrics)
        }
    }, [groupMetrics, selectedMetricProperties])

    const handleRetry = () => {
        refetchGroupMetrics() // Retry fetching the data when the button is clicked
    }

    return (
        <div className="my-4 flex flex-col gap-y-10 mt-20">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold text-center">Metrics Graph</h1>
                <select
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value)} // Switch between annual and quarterly
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="annual">Annual</option>
                    <option value="quarter">Quarterly</option>
                </select>
            </div>

            <Select
                isMulti
                options={metricPropertyOptions}
                onChange={(selectedOptions) => setSelectedMetricProperties(selectedOptions || [])}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select metric properties to display"
                value={selectedMetricProperties}
            />

            <div className="h-[300px] w-[800px]">
                {groupMetricsLoading ? (
                    <p>Loading metric data...</p>
                ) : groupMetricsError ? (
                    <div>
                        <p>Error loading metrics data: {String(groupMetricsError)}</p>
                        <button
                            onClick={handleRetry}
                            className="mt-4 bg-gray-300 p-2 rounded-md text-gray-700"
                        >
                            Retry
                        </button>
                    </div>
                ) : metricDatasets.length > 0 ? (
                    <BarChart mergedDatasets={metricDatasets} />
                ) : (
                    <p>No data available for the selected metrics</p>
                )}
            </div>
        </div>
    )
}

export default MetricsBarChartWrapper
