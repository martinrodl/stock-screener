import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StockCriteria } from '../types/StockCriteria'
import { Stock } from '../types/Stock'

// Define the type for the initial state
interface StockState {
    criteria: StockCriteria
    results: Stock[]
}

// Provide an initial state with the correct type
const initialState: StockState = {
    criteria: {},
    results: [],
}

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setCriteria: (state, action: PayloadAction<StockCriteria>) => {
            state.criteria = action.payload
        },
        setResults: (state, action: PayloadAction<Stock[]>) => {
            state.results = action.payload
        },
    },
})

export const { setCriteria, setResults } = stockSlice.actions
export default stockSlice.reducer
