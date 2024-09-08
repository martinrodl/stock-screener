import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import BarChart from './BarChart'
import { useStocksControllerGetGroupMetricsQuery } from '../services/beGeneratedApi'
import { getProperties } from '../helpers/getPropertyData'

interface MetricsBarChartWrapperProps {
    symbol: string
    initialSelectedProperties?: { value: string; label: string }[]
}

const MetricsBarChartWrapper: React.FC<MetricsBarChartWrapperProps> = ({
    symbol,
    initialSelectedProperties,
}) => {
    const [metricDatasets, setMetricDatasets] = useState<any[]>([])
    const [selectedMetricProperties, setSelectedMetricProperties] = useState(
        initialSelectedProperties || []
    )
    const [metricPropertyOptions, setMetricPropertyOptions] = useState<any[]>([])

    const {
        data: groupMetrics,
        error: groupMetricsError,
        isLoading: groupMetricsLoading,
        refetch: refetchGroupMetrics,
    } = useStocksControllerGetGroupMetricsQuery({ symbol, periodType: 'annual' })

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
        refetchGroupMetrics()
    }

    if (groupMetricsLoading) {
        return <p>Loading metric data...</p>
    }

    if (groupMetricsError) {
        return (
            <div>
                <p>Error loading metrics data: {String(groupMetricsError)}</p>
                <button onClick={handleRetry} className="bg-gray-200 p-2 rounded">
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="my-4 flex flex-col gap-y-10 mt-20">
            <h1 className="text-lg font-semibold text-center">Metrics Graph</h1>
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
                {metricDatasets.length > 0 ? (
                    <BarChart mergedDatasets={metricDatasets} />
                ) : (
                    <p>No data available for the selected metrics</p>
                )}
            </div>
        </div>
    )
}

export default MetricsBarChartWrapper
