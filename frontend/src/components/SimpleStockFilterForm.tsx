import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux'

import { SimpleStockCriteria } from '../types/StockCriteria'
import { filteredCriteria } from '../helpers/filteredCriteria'
import { setSimpleCriteria } from '../store/stockSlice'

const marketCapOptions = [
    { label: '', value: '' },
    { label: '0', value: 0 },
    { label: '1B', value: 1000000000 },
    { label: '5B', value: 5000000000 },
    { label: '10B', value: 100000000000 },
    { label: '50B', value: 50000000000 },
    { label: '100B', value: 100000000000 },
]
interface SimpleStockFilterFormProps {
    onSubmit: (formState: SimpleStockCriteria) => void
    savedStockCriteria: SimpleStockCriteria
    displayedCriteria?: string[]
}

// Tooltip information for each metric
const tooltips: { [key: string]: string } = {
    marketCapMin: 'Minimum market capitalization.',
    peRatioMax: 'Maximum price-to-earnings ratio.',
    numberYears:
        'Number of years to consider for criteria \n positiveProfitYears \n positiveOperatingCashFlowYears \n positiveFreeCashFlowYears \n positiveDividendGrowthYears',
}

const SimpleStockFilterForm: React.FC<SimpleStockFilterFormProps> = ({
    onSubmit,
    savedStockCriteria,
    displayedCriteria,
}) => {
    const dispatch = useDispatch()
    const [formState, setFormState] = useState<SimpleStockCriteria>({
        marketCapMin: savedStockCriteria?.marketCapMin ?? '',
        peRatioMin: savedStockCriteria?.peRatioMin ?? '',
        peRatioMax: savedStockCriteria?.peRatioMax ?? '',
        roicMin: savedStockCriteria?.roicMin ?? '',
        roic10yMin: savedStockCriteria?.roic10yMin ?? '',
        roeMin: savedStockCriteria?.roeMin ?? '',
        roe10yMin: savedStockCriteria?.roe10yMin ?? '',
        averageProfitGrowthMin: savedStockCriteria?.averageProfitGrowthMin ?? '',
        averageDividendGrowthMin: savedStockCriteria?.averageDividendGrowthMin ?? '',
        averageNetIncomeGrowthMin: savedStockCriteria?.averageNetIncomeGrowthMin ?? '',
        averageProfitMarginMin: savedStockCriteria?.averageProfitMarginMin ?? '',
        profitMarginMin: savedStockCriteria?.profitMarginMin ?? '',
        dividendYieldMin: savedStockCriteria?.dividendYieldMin ?? '',
        dividendYield10yMin: savedStockCriteria?.dividendYield10yMin ?? '',
        debtToAssetsMax: savedStockCriteria?.debtToAssetsMax ?? '',
        debtToEquityMax: savedStockCriteria?.debtToEquityMax ?? '',
        // netDebtToEBITDAMax: savedStockCriteria?.netDebtToEBITDAMax ?? '',
        // yearReturnMin: savedStockCriteria?.yearReturnMin ?? '',
        IntrinsicRatioZeroMin: savedStockCriteria?.IntrinsicRatioZeroMin ?? '',
        IntrinsicRatioAverageMin: savedStockCriteria?.IntrinsicRatioAverageMin ?? '',
        IntrinsicRatioLastYearMin: savedStockCriteria?.IntrinsicRatioLastYearMin ?? '',
    })
    const [isFormVisible, setIsFormVisible] = useState(true)

    const percentageFields = [
        'roeMin',
        'roe10yMin',
        'roicMin',
        'roic10yMin',
        'averageProfitGrowthMin',
        'averageDividendGrowthMin',
        'averageNetIncomeGrowthMin',
        'averageProfitMarginMin',
        'profitMarginMin',
        'dividendYieldMin',
        'dividendYield10yMin',
        'debtToAssetsMax',
        'debtToEquityMax',
    ]

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target

        if (percentageFields.includes(name) && value) {
            value = (parseFloat(value) / 100).toString()
        }

        // Update the state with the new value, even if it's an empty string
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(filteredCriteria(formState))
        dispatch(setSimpleCriteria(filteredCriteria(formState)))
    }

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible)
    }

    const prepareFieldValue = (key: string, value: string) => {
        if (percentageFields.includes(key) && value) {
            return (parseFloat(value) * 100).toFixed(0)
        }
        return value
    }

    const renderFormField = (key: string, value: string) => {
        switch (key) {
            case 'marketCapMin':
                return (
                    <select
                        name={key}
                        id={key}
                        value={value}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {marketCapOptions.map((option) => (
                            <option key={option.label} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )
            case 'dividendYieldMin':
            case 'roicMin':
            case 'roeMin':
            case 'roic10yMin':
            case 'roe10yMin':
            case 'averageProfitGrowthMin':
            case 'averageDividendGrowthMin':
            case 'averageNetIncomeGrowthMin':
            case 'averageProfitMarginMin':
            case 'profitMarginMin':
            case 'dividendYield10yMin':
            case 'debtToAssetsMax':
            case 'debtToEquityMax':
                return (
                    <div className="relative">
                        <input
                            type="number"
                            name={key}
                            id={key}
                            value={prepareFieldValue(key, value)}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {value && (
                            <span className="absolute inset-y-0 right-16 top-1 flex items-center text-sm leading-5">
                                %
                            </span>
                        )}
                    </div>
                )
            default:
                return (
                    <input
                        type="number"
                        name={key}
                        id={key}
                        value={value}
                        onChange={handleChange}
                        className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                )
        }
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
                <form onSubmit={handleSubmit} className="md:max-w-xl max-w-xs x-auto p-4">
                    {/* Input fields with labels and tooltips */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-3">
                        {Object.entries(formState)
                            .filter(
                                ([key]) =>
                                    !displayedCriteria ||
                                    displayedCriteria.length === 0 ||
                                    displayedCriteria.includes(key)
                            ) // Check if displayedCriteria is empty or contains the key
                            .map(([key, value]) => (
                                <div key={key} className="grid grid-rows-2 items-end">
                                    {/* ... other fields */}
                                    <label
                                        htmlFor={key}
                                        className="text-sm line-clamp-2 font-medium text-gray-700 capitalize max-h-10"
                                    >
                                        {key.replace(/([A-Z])/g, ' $1')}:
                                        <span
                                            className="ml-1 cursor-pointer text-indigo-600 hover:text-indigo-800"
                                            title={tooltips[key]}
                                            data-tooltip-id={key}
                                        >
                                            ⓘ
                                        </span>
                                    </label>
                                    {renderFormField(key, value)}
                                </div>
                            ))}
                    </div>
                    {/* Submit button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Filter Stocks
                        </button>
                    </div>
                </form>
            )}
            <ReactTooltip
                id="numberYears"
                place="bottom"
                variant="info"
                content={tooltips.numberYears}
            />
        </div>
    )
}

export default SimpleStockFilterForm
