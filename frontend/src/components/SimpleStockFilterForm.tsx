import React, { useState, FormEvent } from 'react'
import NumericLineFilter from './filter/NumericLineFilter'
import RatioLineFilter from './filter/RatioLineFilter'
import MultiSelectFilter from './filter/MultiSelectFilter'
import { useDispatch } from 'react-redux'
import { setSimpleCriteria } from '../store/stockSlice'
import { filteredCriteria } from '../helpers/filteredCriteria'
import { SimpleStockCriteria } from '../types/StockCriteria'
import {
    FilterNumberProperty,
    FilterNumberCondition,
    FilterStringCondition,
} from '../types/filter.enum'

const SimpleStockFilterForm: React.FC = () => {
    const dispatch = useDispatch()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [formState, setFormState] = useState<SimpleStockCriteria>({
        [FilterNumberProperty.MARKETCAP]: 1000000000,
        [FilterNumberProperty.PERATIO]: 12,
        [FilterNumberProperty.ROIC5Y]: 0.1,
        [FilterNumberProperty.ROE5Y]: NaN,
        [FilterNumberProperty.AVERAGEPROFITGROWTH5Y]: 0.1,
        [FilterNumberProperty.AVERAGEDIVIDENDGROWTH5Y]: NaN,
        [FilterNumberProperty.AVERAGENETINCOMEGROWTH5Y]: NaN,
        [FilterNumberProperty.AVERAGEPROFITMARGIN5Y]: 0.15,
        [FilterNumberProperty.DIVIDENDYIELD5Y]: NaN,
        [FilterNumberProperty.DEBTTOASSETS]: NaN,
        [FilterNumberProperty.DEBTTOEQUITY]: NaN,
        IntrinsicRatioZeroMin: NaN,
        IntrinsicRatioAverageMin: NaN,
        IntrinsicRatioLastYearMin: NaN,
        countries: [] as string[],
        sectors: [] as string[],
        industries: [] as string[],
        ratioIntristicValue0growth: {
            numerator: FilterNumberProperty.PRICE,
            denominator: FilterNumberProperty.INTRINSICVALUEZEROGROWTH,
            condition: FilterNumberCondition.LESS_THAN,
            value: 0.8,
        },
        ratioIntristicValue5ygrowth: {
            numerator: FilterNumberProperty.PRICE,
            denominator: FilterNumberProperty.INTRINSICVALUEAVERAGEGROWTH5Y,
            condition: FilterNumberCondition.LESS_THAN,
            value: 0.6,
        },
    })
    console.log('formState ', formState)

    const handleNumericFilterChange = (criteria: {
        property: FilterNumberProperty
        condition: FilterNumberCondition
        value: number | string
    }) => {
        console.log('****')
        const newValue =
            !criteria.value || isNaN(Number(criteria.value)) ? NaN : Number(criteria.value)

        setFormState((prevState) => ({
            ...prevState,
            [criteria.property]: newValue,
        }))
    }
    const handleRatioFilterChange = (
        criteria: {
            numerator: FilterNumberProperty
            denominator: FilterNumberProperty
            condition: FilterNumberCondition
            value: number
        },
        type: 'ratioIntristicValue0growth' | 'ratioIntristicValue5ygrowth'
    ) => {
        setFormState((prevState) => ({
            ...prevState,
            [type]: criteria,
        }))
    }

    const handleMultiSelectChange = (type: string, values: string[]) => {
        setFormState((prevState) => ({
            ...prevState,
            [type]: values,
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const numberCriteria = Object.keys(FilterNumberProperty)
            .map((key) => {
                const property = FilterNumberProperty[key as keyof typeof FilterNumberProperty]
                const value = formState[property]
                return {
                    property,
                    condition: FilterNumberCondition.GREATER_THAN, // Default condition
                    value: !isNaN(Number(value)) ? Number(value) : undefined,
                }
            })
            .filter(
                (criteria) =>
                    !isNaN(criteria.value as number) &&
                    criteria.value !== '' &&
                    criteria.value !== undefined
            )

        const requestBody = {
            numberCriteria,
            stringCriteria: [
                // {
                //     property: 'symbol',
                //     condition: FilterStringCondition.EQUAL,
                //     value: formState.stockSymbol,
                // },
            ].filter((criteria) => criteria.value !== ''),
            ratioCriteria: [
                {
                    numerator: formState.ratioIntristicValue0growth.numerator,
                    denominator: formState.ratioIntristicValue0growth.denominator,
                    condition: formState.ratioIntristicValue0growth.condition,
                    value: formState.ratioIntristicValue0growth.value,
                },
                {
                    numerator: formState.ratioIntristicValue5ygrowth.numerator,
                    denominator: formState.ratioIntristicValue5ygrowth.denominator,
                    condition: formState.ratioIntristicValue5ygrowth.condition,
                    value: formState.ratioIntristicValue5ygrowth.value,
                },
            ].filter((criteria) => criteria.value),
            multiCriteria: [
                {
                    type: 'country',
                    values: formState.countries,
                },
                {
                    type: 'sector',
                    values: formState.sectors,
                },
                {
                    type: 'industry',
                    values: formState.industries,
                },
            ].filter((criteria) => criteria.values.length > 0),
        }

        const filteredState = filteredCriteria(requestBody)
        dispatch(setSimpleCriteria(filteredState))
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
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.MARKETCAP}
                            initialValue={formState[FilterNumberProperty.MARKETCAP]}
                        />
                        {/* <StringLineFilter
                            onChange={handleStringFilterChange}
                            initialCondition={FilterStringCondition.EQUAL}
                            initialProperty="symbol"
                            initialValue={formState.stockSymbol}
                        /> */}
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.LESS_THAN}
                            initialProperty={FilterNumberProperty.PERATIO}
                            initialValue={formState[FilterNumberProperty.PERATIO]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.ROIC}
                            initialValue={formState[FilterNumberProperty.ROIC]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.ROIC5Y}
                            initialValue={formState[FilterNumberProperty.ROIC5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.ROE}
                            initialValue={formState[FilterNumberProperty.ROE]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.ROE5Y}
                            initialValue={formState[FilterNumberProperty.ROE5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.AVERAGEPROFITGROWTH5Y}
                            initialValue={formState[FilterNumberProperty.AVERAGEPROFITGROWTH5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.AVERAGEDIVIDENDGROWTH5Y}
                            initialValue={formState[FilterNumberProperty.AVERAGEDIVIDENDGROWTH5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.AVERAGENETINCOMEGROWTH5Y}
                            initialValue={formState[FilterNumberProperty.AVERAGENETINCOMEGROWTH5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.AVERAGEPROFITMARGIN5Y}
                            initialValue={formState[FilterNumberProperty.AVERAGEPROFITMARGIN5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.GREATER_THAN}
                            initialProperty={FilterNumberProperty.DIVIDENDYIELD5Y}
                            initialValue={formState[FilterNumberProperty.DIVIDENDYIELD5Y]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.LESS_THAN}
                            initialProperty={FilterNumberProperty.DEBTTOASSETS}
                            initialValue={formState[FilterNumberProperty.DEBTTOASSETS]}
                        />
                        <NumericLineFilter
                            onChange={handleNumericFilterChange}
                            initialCondition={FilterNumberCondition.LESS_THAN}
                            initialProperty={FilterNumberProperty.DEBTTOEQUITY}
                            initialValue={formState[FilterNumberProperty.DEBTTOEQUITY]}
                        />
                        <RatioLineFilter
                            onChange={(criteria) =>
                                handleRatioFilterChange(criteria, 'ratioIntristicValue0growth')
                            }
                            initialCondition={formState.ratioIntristicValue0growth.condition}
                            initialNumerator={formState.ratioIntristicValue0growth.numerator}
                            initialDenominator={formState.ratioIntristicValue0growth.denominator}
                            initialValue={formState.ratioIntristicValue0growth.value}
                        />
                        <RatioLineFilter
                            onChange={(criteria) =>
                                handleRatioFilterChange(criteria, 'ratioIntristicValue5ygrowth')
                            }
                            initialCondition={formState.ratioIntristicValue5ygrowth.condition}
                            initialNumerator={formState.ratioIntristicValue5ygrowth.numerator}
                            initialDenominator={formState.ratioIntristicValue5ygrowth.denominator}
                            initialValue={formState.ratioIntristicValue5ygrowth.value}
                        />
                        <MultiSelectFilter
                            type="country"
                            onChange={(values) => handleMultiSelectChange('countries', values)}
                        />
                        <MultiSelectFilter
                            type="sector"
                            onChange={(values) => handleMultiSelectChange('sectors', values)}
                        />
                        <MultiSelectFilter
                            type="industry"
                            onChange={(values) => handleMultiSelectChange('industries', values)}
                        />
                    </div>
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
        </div>
    )
}

export default SimpleStockFilterForm
