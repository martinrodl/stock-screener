import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import BarChart from './BarChart'
import { useStocksControllerGetGroupStatementsQuery } from '../services/beGeneratedApi'
import { getProperties } from '../helpers/getPropertyData'

interface StatementBarChartWrapperProps {
    symbol: string
    initialSelectedProperties?: { value: string; label: string }[]
    onLoadComplete: () => void
}

const StatementBarChartWrapper: React.FC<StatementBarChartWrapperProps> = ({
    symbol,
    initialSelectedProperties,
    onLoadComplete,
}) => {
    const [statementDatasets, setStatementDatasets] = useState<any[]>([])
    const [selectedStatementProperties, setSelectedStatementProperties] = useState(
        initialSelectedProperties || []
    )
    const [statementPropertyOptions, setStatementPropertyOptions] = useState<any[]>([])

    const {
        data: groupStatements,
        error: groupStatementsError,
        isLoading: groupStatementsLoading,
        refetch: refetchGroupStatements,
    } = useStocksControllerGetGroupStatementsQuery({ symbol, periodType: 'annual' })

    useEffect(() => {
        if (!groupStatementsLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, groupStatementsLoading])

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

        if (groupStatements) {
            const statementKeys = extractKeys(groupStatements)
            const statementOptions = statementKeys.map((key) => ({ value: key, label: key }))
            setStatementPropertyOptions(statementOptions)

            // If initial properties are set, use them
            if (initialSelectedProperties) {
                const selectedProperties = getProperties(
                    groupStatements,
                    initialSelectedProperties.map((prop) => prop.value)
                )
                setStatementDatasets(selectedProperties)
            }
        }
    }, [groupStatements, initialSelectedProperties])

    useEffect(() => {
        if (groupStatements && selectedStatementProperties.length > 0) {
            const selectedStatementPropertyNames = selectedStatementProperties.map(
                (prop) => prop.value
            )
            const selectedStatements = getProperties(
                groupStatements,
                selectedStatementPropertyNames
            )
            setStatementDatasets(selectedStatements)
        }
    }, [groupStatements, selectedStatementProperties])

    // Retry fetching in case of failure
    const handleRetry = () => {
        refetchGroupStatements()
    }

    if (groupStatementsLoading) {
        return <p>Loading statement data...</p>
    }

    if (groupStatementsError) {
        return (
            <div>
                <p>Error loading statement data: {String(groupStatementsError)}</p>
                <button onClick={handleRetry} className="bg-gray-200 p-2 rounded">
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="my-4 flex flex-col gap-y-10 mt-20">
            <h1 className="text-lg font-semibold text-center">Statements Graph</h1>
            <Select
                isMulti
                options={statementPropertyOptions}
                onChange={(selectedOptions) =>
                    setSelectedStatementProperties(selectedOptions || [])
                }
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select statement properties to display"
                value={selectedStatementProperties}
            />
            <div className="h-[300px] w-[800px]">
                {statementDatasets.length > 0 ? (
                    <BarChart mergedDatasets={statementDatasets} />
                ) : (
                    <p>No data available for the selected properties</p>
                )}
            </div>
        </div>
    )
}

export default StatementBarChartWrapper
