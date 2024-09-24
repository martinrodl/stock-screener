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
    const [periodType, setPeriodType] = useState('annual') // State for switching period types

    const {
        data: groupStatements,
        error: groupStatementsError,
        isLoading: groupStatementsLoading,
        refetch: refetchGroupStatements,
    } = useStocksControllerGetGroupStatementsQuery({
        symbol,
        periodType,
        limit: 10, // Fetch 10 results
    })

    useEffect(() => {
        if (!groupStatementsLoading) {
            onLoadComplete()
        }
    }, [onLoadComplete, groupStatementsLoading])

    useEffect(() => {
        // Make sure to check if groupStatements and groupStatements.statements exist
        if (groupStatements?.statements) {
            const extractKeys = (data: any[]) => {
                const keys = new Set<string>()
                data.forEach((item) => {
                    Object.keys(item).forEach((key) => keys.add(key))
                })
                return Array.from(keys).filter(
                    (key) => !['date', 'period', 'calendarYear'].includes(key)
                )
            }

            const statementKeys = extractKeys(groupStatements.statements) // Access statements array
            const statementOptions = statementKeys.map((key) => ({ value: key, label: key }))
            setStatementPropertyOptions(statementOptions)

            // If initial properties are set, use them
            if (initialSelectedProperties) {
                const selectedProperties = getProperties(
                    groupStatements.statements,
                    initialSelectedProperties.map((prop) => prop.value)
                )
                setStatementDatasets(selectedProperties)
            }
        }
    }, [groupStatements, initialSelectedProperties])

    useEffect(() => {
        if (groupStatements?.statements && selectedStatementProperties.length > 0) {
            const selectedStatementPropertyNames = selectedStatementProperties.map(
                (prop) => prop.value
            )
            const selectedStatements = getProperties(
                groupStatements.statements, // Access statements array
                selectedStatementPropertyNames
            )
            setStatementDatasets(selectedStatements)
        }
    }, [groupStatements, selectedStatementProperties])

    // Retry fetching in case of failure
    const handleRetry = () => {
        refetchGroupStatements()
    }

    return (
        <div className="my-4 flex flex-col gap-y-10 mt-20">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold text-center">Statements Graph</h1>
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
                {groupStatementsLoading ? (
                    <p>Loading statement data...</p>
                ) : groupStatementsError ? (
                    <div>
                        <p>Error loading statement data: {String(groupStatementsError)}</p>
                        <button
                            onClick={handleRetry}
                            className="mt-4 bg-gray-300 p-2 rounded-md text-gray-700"
                        >
                            Retry
                        </button>
                    </div>
                ) : statementDatasets.length > 0 ? (
                    <BarChart mergedDatasets={statementDatasets} />
                ) : (
                    <p>No data available for the selected properties</p>
                )}
            </div>
        </div>
    )
}

export default StatementBarChartWrapper
