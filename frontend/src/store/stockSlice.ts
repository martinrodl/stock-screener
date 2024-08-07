import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StockCriteria, SimpleStockCriteria } from '../types/StockCriteria'
import { Stock } from '../types/Stock'
import {
    FilterNumberProperty,
    FilterNumberCondition,
    FilterStringCondition,
} from '../types/filter.enum'

// Define the type for the initial state
interface StockState {
    criteria: StockCriteria
    simpleCriteria: SimpleStockCriteria
    grahamsCriteria: StockCriteria
    results: Stock[]
    simpleResults: Stock[]
    grahamsResults: Stock[]
}

// Provide an initial state with the correct type
const initialState: StockState = {
    criteria: {},
    simpleCriteria: {
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
    },
    results: [],
    simpleResults: [],
    grahamsCriteria: {},
    grahamsResults: [],
}

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setCriteria: (state, action: PayloadAction<StockCriteria>) => {
            state.criteria = action.payload
        },
        setSimpleCriteria: (state, action: PayloadAction<SimpleStockCriteria>) => {
            state.simpleCriteria = action.payload
        },
        setGrahamsCriteria: (state, action: PayloadAction<StockCriteria>) => {
            state.grahamsCriteria = action.payload
        },
        setResults: (state, action: PayloadAction<Stock[]>) => {
            state.results = action.payload
        },
        setSimpleResults: (state, action: PayloadAction<Stock[]>) => {
            state.simpleResults = action.payload
        },
        setGrahamReults: (state, action: PayloadAction<Stock[]>) => {
            state.grahamsResults = action.payload
        },
    },
})

export const {
    setCriteria,
    setResults,
    setGrahamReults,
    setGrahamsCriteria,
    setSimpleResults,
    setSimpleCriteria,
} = stockSlice.actions
export default stockSlice.reducer
