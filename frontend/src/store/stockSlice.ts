import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StockCriteria, SimpleStockCriteria } from '../types/StockCriteria'
import { Stock } from '../types/Stock'

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
    simpleCriteria: {},
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
