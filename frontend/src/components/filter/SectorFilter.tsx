import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useEtfControllerGetIndustriesQuery } from '../../services/beGeneratedApi'

interface SectorFilterProps {
    onChange: (selectedValues: string[]) => void
    initialValues?: string[]
}

const SectorFilter: React.FC<SectorFilterProps> = ({ onChange, initialValues }) => {
    const [options, setOptions] = useState<{ label: string; value: string }[]>([])
    const [selectedValues, setSelectedValues] = useState<{ label: string; value: string }[]>([])

    const { data: sectorsData, isLoading: isLoadingSectors } = useEtfControllerGetIndustriesQuery()

    useEffect(() => {
        if (sectorsData) {
            setOptions(sectorsData.map((sector) => ({ label: sector, value: sector })))
        }
    }, [sectorsData])

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
            <label htmlFor="sector" className="capitalize">
                Sector
            </label>
            <Select
                isMulti
                name="sector"
                options={options}
                value={selectedValues}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
                isLoading={isLoadingSectors}
            />
        </div>
    )
}

export default SectorFilter
