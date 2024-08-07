import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import {
    useFilterControllerGetCountriesQuery,
    useFilterControllerGetSectorsQuery,
    useFilterControllerGetIndustriesQuery,
} from '../../services/beGeneratedApi'

interface MultiSelectFilterProps {
    type: 'country' | 'sector' | 'industry'
    onChange: (selectedValues: string[]) => void
    initialValues?: string[] // Add initialValues prop for setting default values
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ type, onChange, initialValues }) => {
    const [options, setOptions] = useState<{ label: string; value: string }[]>([])
    const [selectedValues, setSelectedValues] = useState<{ label: string; value: string }[]>([])

    const { data: countriesData, isLoading: isLoadingCountries } =
        useFilterControllerGetCountriesQuery()
    const { data: sectorsData, isLoading: isLoadingSectors } = useFilterControllerGetSectorsQuery()
    const { data: industriesData, isLoading: isLoadingIndustries } =
        useFilterControllerGetIndustriesQuery()

    useEffect(() => {
        let data: string[] = []
        switch (type) {
            case 'country':
                data = countriesData?.countries || []
                break
            case 'sector':
                data = sectorsData?.sectors || []
                break
            case 'industry':
                data = industriesData?.industries || []
                break
            default:
                break
        }
        setOptions(data.map((item) => ({ label: item, value: item })))
    }, [type, countriesData, sectorsData, industriesData])

    useEffect(() => {
        if (initialValues) {
            setSelectedValues(initialValues.map((value) => ({ label: value, value })))
        }
    }, [initialValues])

    const handleChange = (selectedOptions: any) => {
        setSelectedValues(selectedOptions)
        onChange(selectedOptions.map((option: any) => option.value))
    }

    return (
        <div className="flex items-center gap-2">
            <label htmlFor={type} className="capitalize">
                {type}
            </label>
            <Select
                isMulti
                name={type}
                options={options}
                value={selectedValues}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
                isLoading={isLoadingCountries || isLoadingSectors || isLoadingIndustries}
            />
        </div>
    )
}

export default MultiSelectFilter
