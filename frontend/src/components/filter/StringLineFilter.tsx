import React, { ChangeEvent, FC, useState } from 'react'
import { StringFilterCriteriaDto } from '../services/beGeneratedApi'
import { FilterStringProperty, FilterStringCondition } from '../../types/filter.enum'

interface StringLineFilterProps {
    onChange: (criteria: StringFilterCriteriaDto) => void
    initialCondition?: FilterStringCondition
    initialProperty?: FilterStringProperty
    initialValue?: string
}

const StringLineFilter: FC<StringLineFilterProps> = ({
    onChange,
    initialCondition = FilterStringCondition.EQUAL,
    initialProperty = FilterStringProperty.SYMBOL,
    initialValue = '',
}) => {
    const [condition, setCondition] = useState(initialCondition)
    const [property, setProperty] = useState(initialProperty)
    const [value, setValue] = useState(initialValue)

    const handleConditionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCondition = e.target.value as FilterStringCondition
        setCondition(newCondition)
        onChange({ property, condition: newCondition, value })
    }

    const handlePropertyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newProperty = e.target.value as FilterStringProperty
        setProperty(newProperty)
        onChange({ property: newProperty, condition, value })
    }

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onChange({ property, condition, value: newValue })
    }

    const propertyOptions = Object.keys(FilterStringProperty) as Array<
        keyof typeof FilterStringProperty
    >
    const conditionOptions = Object.keys(FilterStringCondition) as Array<
        keyof typeof FilterStringCondition
    >

    return (
        <div className="flex items-center gap-2">
            <select
                value={property}
                onChange={handlePropertyChange}
                className="border p-2 rounded w-60"
            >
                {propertyOptions.map((option) => (
                    <option key={option} value={FilterStringProperty[option]}>
                        {FilterStringProperty[option]}
                    </option>
                ))}
            </select>
            <select
                value={condition}
                onChange={handleConditionChange}
                className="border p-2 rounded w-40"
            >
                {conditionOptions.map((option) => (
                    <option key={option} value={FilterStringCondition[option]}>
                        {FilterStringCondition[option]}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={value}
                onChange={handleValueChange}
                className="border p-2 rounded w-40"
            />
        </div>
    )
}

export default StringLineFilter
