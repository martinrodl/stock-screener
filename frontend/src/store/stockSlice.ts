import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StockCriteria } from '../types/StockCriteria'
import { Stock } from '../types/Stock'

// Define the type for the initial state
interface StockState {
    criteria: StockCriteria
    grahamsCriteria: StockCriteria
    results: Stock[]
    grahamsResults: Stock[]
}

// Provide an initial state with the correct type
const initialState: StockState = {
    criteria: {},
    results: [],
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
        setGrahamsCriteria: (state, action: PayloadAction<StockCriteria>) => {
            state.grahamsCriteria = action.payload
        },
        setResults: (state, action: PayloadAction<Stock[]>) => {
            state.results = action.payload
        },
        setGrahamReults: (state, action: PayloadAction<Stock[]>) => {
            state.grahamsResults = action.payload
        },
    },
})

export const { setCriteria, setResults, setGrahamReults, setGrahamsCriteria } = stockSlice.actions
export default stockSlice.reducer
