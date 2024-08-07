import React, { useState, useEffect, FormEvent } from 'react'
import NumericLineFilter from './NumericLineFilter'
import StringLineFilter from './StringLineFilter'
import RatioLineFilter from './RatioLineFilter'
import MultiSelectFilter from './MultiSelectFilter'
import {
    NumberFilterCriteriaDto,
    StringFilterCriteriaDto,
    RatioCriteriaDto,
    MultiCriteria,
} from '../../services/beGeneratedApi'

type FilterType = 'numeric' | 'string' | 'ratio' | 'multi'

interface Filter {
    id: number
    type: FilterType
    criteria: NumberFilterCriteriaDto | StringFilterCriteriaDto | RatioCriteriaDto | string[]
    multiType?: MultiCriteria['type']
}

interface DynamicFilterFormProps {
    onSubmit: (criteria: any) => void
    onSave: (criteria: any) => void
    onDelete: (filterId: string) => void
    filter?: {
        name: string
        numberCriteria: NumberFilterCriteriaDto[]
        stringCriteria: StringFilterCriteriaDto[]
        ratioCriteria: RatioCriteriaDto[]
        multiCriteria?: MultiCriteria[]
    }
    filterId?: string // Add filterId as a prop
}

const DynamicFilterForm: React.FC<DynamicFilterFormProps> = ({
    onSubmit,
    onSave,
    onDelete,
    filter,
    filterId,
}) => {
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [filters, setFilters] = useState<Filter[]>([])
    const [nextFilterId, setNextFilterId] = useState(1)
    const [filterName, setFilterName] = useState('')
    const [availableMultiTypes, setAvailableMultiTypes] = useState<MultiCriteria['type'][]>([
        'country',
        'sector',
        'industry',
    ])

    useEffect(() => {
        if (filter) {
            const initialFilters: Filter[] = []
            let idCounter = 1

            ;(filter.numberCriteria || []).forEach((criteria) => {
                initialFilters.push({ id: idCounter++, type: 'numeric', criteria })
            })
            ;(filter.stringCriteria || []).forEach((criteria) => {
                initialFilters.push({ id: idCounter++, type: 'string', criteria })
            })
            ;(filter.ratioCriteria || []).forEach((criteria) => {
                initialFilters.push({ id: idCounter++, type: 'ratio', criteria })
            })
            ;(filter.multiCriteria || []).forEach((multiCriteria) => {
                initialFilters.push({
                    id: idCounter++,
                    type: 'multi',
                    criteria: multiCriteria.values,
                    multiType: multiCriteria.type,
                })
                setAvailableMultiTypes(
                    availableMultiTypes.filter((type) => type !== multiCriteria.type)
                )
            })

            setFilters(initialFilters)
            setNextFilterId(idCounter)
            setFilterName(filter.name)
        }
    }, [filter])

    const handleAddFilter = (type: FilterType, multiType?: MultiCriteria['type']) => {
        const newFilter: Filter = {
            id: nextFilterId,
            type,
            criteria:
                type === 'numeric'
                    ? { property: 'marketCap', condition: 'greater_than', value: 0 }
                    : type === 'string'
                    ? { property: 'symbol', condition: 'equal', value: '' }
                    : type === 'ratio'
                    ? {
                          numerator: 'price',
                          denominator: 'marketCap',
                          condition: 'greater_than',
                          value: 0,
                      }
                    : [],
            multiType,
        }
        setFilters([...filters, newFilter])
        setNextFilterId(nextFilterId + 1)
        if (multiType) {
            setAvailableMultiTypes(availableMultiTypes.filter((type) => type !== multiType))
        }
    }

    const handleRemoveFilter = (id: number) => {
        const filterToRemove = filters.find((filter) => filter.id === id)
        setFilters(filters.filter((filter) => filter.id !== id))
        if (filterToRemove?.multiType) {
            setAvailableMultiTypes([...availableMultiTypes, filterToRemove.multiType])
        }
    }

    const handleFilterChange = (
        id: number,
        criteria: NumberFilterCriteriaDto | StringFilterCriteriaDto | RatioCriteriaDto | string[]
    ) => {
        setFilters(filters.map((filter) => (filter.id === id ? { ...filter, criteria } : filter)))
    }

    const handleMultiSelectChange = (id: number, values: string[]) => {
        const multiFilter = filters.find((filter) => filter.id === id)
        if (multiFilter) {
            handleFilterChange(multiFilter.id, values)
        }
    }

    const constructRequestBody = () => {
        const numberCriteria = filters
            .filter((f) => f.type === 'numeric')
            .map((f) => f.criteria as NumberFilterCriteriaDto)
        const stringCriteria = filters
            .filter((f) => f.type === 'string')
            .map((f) => f.criteria as StringFilterCriteriaDto)
        const ratioCriteria = filters
            .filter((f) => f.type === 'ratio')
            .map((f) => f.criteria as RatioCriteriaDto)
        const multiCriteriaFilters = filters
            .filter((f) => f.type === 'multi')
            .map((f) => ({ type: f.multiType, values: f.criteria as string[] }))
            .filter((f) => f.type && f.values.length > 0) // Ensure type and values are valid

        return {
            numberCriteria,
            stringCriteria,
            ratioCriteria,
            name: filterName,
            user: '', // Assuming user is fetched or set elsewhere
            multiCriteria: multiCriteriaFilters,
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestBody = constructRequestBody()
        onSubmit(requestBody)
    }

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestBody = constructRequestBody()
        onSave(requestBody)
    }

    const handleDelete = () => {
        if (filterId) {
            onDelete(filterId)
        }
    }

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible)
    }

    return (
        <div>
            <button
                onClick={toggleFormVisibility}
                className="mb-2 text-indigo-600 hover:text-indigo-800"
            >
                {isFormVisible ? 'Hide Form' : 'Show Form'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="md:max-w-xl max-w-xs mx-auto p-4">
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            placeholder="Enter filter name"
                            className="border p-2 mr-2"
                        />
                        {filters.map((filter) => (
                            <div key={filter.id} className="flex items-center gap-2">
                                {filter.type === 'numeric' && (
                                    <NumericLineFilter
                                        onChange={(criteria) =>
                                            handleFilterChange(filter.id, criteria)
                                        }
                                        initialCondition={
                                            (filter.criteria as NumberFilterCriteriaDto).condition
                                        }
                                        initialProperty={
                                            (filter.criteria as NumberFilterCriteriaDto).property
                                        }
                                        initialValue={
                                            (filter.criteria as NumberFilterCriteriaDto).value
                                        }
                                    />
                                )}
                                {filter.type === 'string' && (
                                    <StringLineFilter
                                        onChange={(criteria) =>
                                            handleFilterChange(filter.id, criteria)
                                        }
                                        initialCondition={
                                            (filter.criteria as StringFilterCriteriaDto).condition
                                        }
                                        initialProperty={
                                            (filter.criteria as StringFilterCriteriaDto).property
                                        }
                                        initialValue={
                                            (filter.criteria as StringFilterCriteriaDto).value
                                        }
                                    />
                                )}
                                {filter.type === 'ratio' && (
                                    <RatioLineFilter
                                        onChange={(criteria) =>
                                            handleFilterChange(filter.id, criteria)
                                        }
                                        initialCondition={
                                            (filter.criteria as RatioCriteriaDto).condition
                                        }
                                        initialNumerator={
                                            (filter.criteria as RatioCriteriaDto).numerator
                                        }
                                        initialDenominator={
                                            (filter.criteria as RatioCriteriaDto).denominator
                                        }
                                        initialValue={(filter.criteria as RatioCriteriaDto).value}
                                    />
                                )}
                                {filter.type === 'multi' && filter.multiType && (
                                    <MultiSelectFilter
                                        type={filter.multiType}
                                        initialValues={filter.criteria as string[]}
                                        onChange={(values) =>
                                            handleMultiSelectChange(filter.id, values)
                                        }
                                    />
                                )}
                                <button
                                    onClick={() => handleRemoveFilter(filter.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleAddFilter('numeric')}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Add Numeric Filter
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddFilter('string')}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Add String Filter
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddFilter('ratio')}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Add Ratio Filter
                            </button>
                            {availableMultiTypes.includes('country') && (
                                <button
                                    type="button"
                                    onClick={() => handleAddFilter('multi', 'country')}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Add Country Filter
                                </button>
                            )}
                            {availableMultiTypes.includes('sector') && (
                                <button
                                    type="button"
                                    onClick={() => handleAddFilter('multi', 'sector')}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Add Sector Filter
                                </button>
                            )}
                            {availableMultiTypes.includes('industry') && (
                                <button
                                    type="button"
                                    onClick={() => handleAddFilter('multi', 'industry')}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Add Industry Filter
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Apply Filter
                        </button>
                        <button
                            onClick={handleSave}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Filter
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default DynamicFilterForm
