import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { RatioFilterCriteriaDto } from '../services/beGeneratedApi'
import { FilterNumberProperty, FilterNumberCondition } from '../../types/filter.enum'

interface RatioLineFilterProps {
    onChange: (criteria: RatioFilterCriteriaDto) => void
    initialCondition?: FilterNumberCondition
    initialNumerator?: FilterNumberProperty
    initialDenominator?: FilterNumberProperty
    initialValue?: number
}

const RatioLineFilter: FC<RatioLineFilterProps> = ({
    onChange,
    initialCondition = FilterNumberCondition.GREATER_THAN,
    initialNumerator = FilterNumberProperty.MARKET_CAP,
    initialDenominator = FilterNumberProperty.MARKET_CAP,
    initialValue = 0,
}) => {
    const [condition, setCondition] = useState(initialCondition)
    const [numerator, setNumerator] = useState(initialNumerator)
    const [denominator, setDenominator] = useState(initialDenominator)
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setCondition(initialCondition)
        setNumerator(initialNumerator)
        setDenominator(initialDenominator)
        setValue(initialValue)
    }, [initialCondition, initialNumerator, initialDenominator, initialValue])

    const handleConditionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCondition = e.target.value as FilterNumberCondition
        setCondition(newCondition)
        onChange({ numerator, denominator, condition: newCondition, value })
    }

    const handleNumeratorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newNumerator = e.target.value as FilterNumberProperty
        setNumerator(newNumerator)
        onChange({ numerator: newNumerator, denominator, condition, value })
    }

    const handleDenominatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newDenominator = e.target.value as FilterNumberProperty
        setDenominator(newDenominator)
        onChange({ numerator, denominator: newDenominator, condition, value })
    }

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value.replace(/,/g, ''))
        setValue(newValue)
        onChange({ numerator, denominator, condition, value: newValue })
    }

    const propertyOptions = Object.keys(FilterNumberProperty) as Array<
        keyof typeof FilterNumberProperty
    >
    const conditionOptions = Object.keys(FilterNumberCondition) as Array<
        keyof typeof FilterNumberCondition
    >

    return (
        <div className="flex items-center gap-2">
            <select
                value={numerator}
                onChange={handleNumeratorChange}
                className="border p-2 rounded w-44"
            >
                {propertyOptions.map((option) => (
                    <option key={option} value={FilterNumberProperty[option]}>
                        {FilterNumberProperty[option]}
                    </option>
                ))}
            </select>
            <span> / </span>
            <select
                value={denominator}
                onChange={handleDenominatorChange}
                className="border p-2 rounded w-44"
            >
                {propertyOptions.map((option) => (
                    <option key={option} value={FilterNumberProperty[option]}>
                        {FilterNumberProperty[option]}
                    </option>
                ))}
            </select>
            <select
                value={condition}
                onChange={handleConditionChange}
                className="border p-2 rounded w-20"
            >
                {conditionOptions.map((option) => (
                    <option key={option} value={FilterNumberCondition[option]}>
                        {FilterNumberCondition[option]}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={value}
                onChange={handleValueChange}
                className="border p-2 rounded w-18"
            />
        </div>
    )
}

export default RatioLineFilter
