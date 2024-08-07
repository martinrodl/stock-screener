import React, { ChangeEvent, FC, useState } from 'react'
import { NumberFilterCriteriaDto } from '../services/beGeneratedApi'
import { FilterNumberProperty, FilterNumberCondition } from '../../types/filter.enum'

interface NumericLineFilterProps {
    onChange: (criteria: NumberFilterCriteriaDto) => void
    initialCondition?: FilterNumberCondition
    initialProperty?: FilterNumberProperty
    initialValue?: number | string
}

const NumericLineFilter: FC<NumericLineFilterProps> = ({
    onChange,
    initialCondition = FilterNumberCondition.GREATER_THAN,
    initialProperty = FilterNumberProperty.MARKET_CAP,
    initialValue = '',
}) => {
    const [condition, setCondition] = useState(initialCondition)
    const [property, setProperty] = useState(initialProperty)
    const [value, setValue] = useState(initialValue)
    console.log('value ', value)

    const handleConditionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCondition = e.target.value as FilterNumberCondition
        setCondition(newCondition)
        onChange({ property, condition: newCondition, value })
    }

    const handlePropertyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newProperty = e.target.value as FilterNumberProperty
        setProperty(newProperty)
        onChange({ property: newProperty, condition, value })
    }

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        const parsedValue = parseFloat(newValue.replace(/,/g, ''))
        if (!isNaN(parsedValue)) {
            setValue(parsedValue)
            onChange({ property, condition, value: parsedValue })
        } else {
            setValue('')
        }
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
                value={property}
                onChange={handlePropertyChange}
                className="border p-2 rounded w-60"
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
                className="border p-2 rounded w-4%"
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
                className="border p-2 rounded w-40"
            />
        </div>
    )
}

export default NumericLineFilter
