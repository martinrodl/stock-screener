import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useDispatch } from 'react-redux'

import { StockCriteria } from '../types/StockCriteria'
import { filteredCriteria } from '../helpers/filteredCriteria'
import { setCriteria, setGrahamsCriteria } from '../store/stockSlice'

const marketCapOptions = [
    { label: '', value: '' },
    { label: '0', value: 0 },
    { label: '10M', value: 10000000 },
    { label: '50M', value: 50000000 },
    { label: '100M', value: 100000000 },
    { label: '500M', value: 500000000 },
    { label: '1B', value: 1000000000 },
    { label: '5B', value: 5000000000 },
    { label: '10B', value: 100000000000 },
    { label: '50B', value: 50000000000 },
    { label: '100B', value: 100000000000 },
]
interface StockFilterFormProps {
    onSubmit: (formState: StockCriteria) => void
    savedStockCriteria: StockCriteria
    isGrahams?: boolean
}

// Tooltip information for each metric
const tooltips: { [key: string]: string } = {
    marketCapMin: 'Minimum market capitalization.',
    peRatioMax: 'Maximum price-to-earnings ratio.',
    numberYears:
        'Number of years to consider for criteria \n positiveProfitYears \n positiveOperatingCashFlowYears \n positiveFreeCashFlowYears \n positiveDividendGrowthYears',
}

const StockFilterForm: React.FC<StockFilterFormProps> = ({
    onSubmit,
    savedStockCriteria,
    isGrahams,
}) => {
    const dispatch = useDispatch()
    const [formState, setFormState] = useState<StockCriteria>({
        marketCapMax: savedStockCriteria?.marketCapMax ?? '',
        marketCapMin: savedStockCriteria?.marketCapMin ?? '',
        peRatioMin: savedStockCriteria?.peRatioMin ?? '',
        peRatioMax: savedStockCriteria?.peRatioMax ?? '',
        dividendYieldMin: savedStockCriteria?.dividendYieldMin ?? '',
        dividendYieldMax: savedStockCriteria?.dividendYieldMax ?? '',
        roicMin: savedStockCriteria?.roicMin ?? '',
        roicMax: savedStockCriteria?.roicMax ?? '',
        roeMin: savedStockCriteria?.roeMin ?? '',
        roeMax: savedStockCriteria?.roeMax ?? '',
        debtToEquityMin: savedStockCriteria?.debtToEquityMin ?? '',
        debtToEquityMax: savedStockCriteria?.debtToEquityMax ?? '',
        interestCoverageMin: savedStockCriteria?.interestCoverageMin ?? '',
        interestCoverageMax: savedStockCriteria?.interestCoverageMax ?? '',
        priceToIntrinsicValueRatioMax: savedStockCriteria?.priceToIntrinsicValueRatioMax ?? '',
        priceToDiscountedCashFlowRatioMax:
            savedStockCriteria?.priceToDiscountedCashFlowRatioMax ?? '',
        positiveProfitYears: savedStockCriteria?.positiveProfitYears ?? '',
        profitGrowthMin: savedStockCriteria?.profitGrowthMin ?? '',
        revenueGrowthMin: savedStockCriteria?.revenueGrowthMin ?? '',
        positiveOperatingCashFlowYears: savedStockCriteria?.positiveOperatingCashFlowYears ?? '',
        positiveFreeCashFlowYears: savedStockCriteria?.positiveFreeCashFlowYears ?? '',
        positiveDividendGrowthYears: savedStockCriteria?.positiveDividendGrowthYears ?? '',
        numberYears: savedStockCriteria?.numberYears ?? '',
    })
    const [isFormVisible, setIsFormVisible] = useState(true)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target

        // Convert percentage to decimal for dividend fields
        if ((name === 'dividendYieldMin' || name === 'dividendYieldMax') && value) {
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
        if (isGrahams) {
            dispatch(setGrahamsCriteria(filteredCriteria(formState)))
        } else {
            dispatch(setCriteria(filteredCriteria(formState)))
        }
    }

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible)
    }

    const prepareFieldValue = (key: string, value: string) => {
        if (key === 'dividendYieldMin' || key === 'dividendYieldMax') {
            // Convert back to percentage for display
            return (parseFloat(value) * 100).toFixed(2)
        }
        return value
    }

    const renderFormField = (key: string, value: string) => {
        switch (key) {
            case 'marketCapMax':
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
            case 'dividendYieldMax':
            case 'roicMin':
            case 'roicMax':
            case 'roeMin':
            case 'roeMax':
            case 'interestCoverageMax':
            case 'interestCoverageMin':
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
            case 'numberYears':
                return (
                    <input
                        type="number"
                        name={key}
                        id={key}
                        value={value || 3}
                        onChange={handleChange}
                        className=" mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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
                        {Object.entries(formState).map(([key, value]) => (
                            <div key={key} className="grid grid-rows-2">
                                {/* ... other fields */}
                                <label
                                    htmlFor={key}
                                    className="block text-sm font-medium text-gray-700 capitalize"
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

export default StockFilterForm
