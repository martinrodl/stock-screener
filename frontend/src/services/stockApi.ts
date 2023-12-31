import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { StockDetail } from '../types/StockDetail'
import { StockCriteria } from '../types/StockCriteria'
import { Stock } from '../types/Stock'
import { StockSureData } from '../types/SureData'

interface StockCriteriaWithPagination extends StockCriteria {
    criteria: StockCriteria
    skip: number
    limit: number
}

export const stockApi = createApi({
    reducerPath: 'stockApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BE_URL }),
    endpoints: (builder) => ({
        fetchStocks: builder.mutation<Stock[], StockCriteriaWithPagination>({
            query: ({ criteria, skip, limit }) => ({
                url: '/api/filterstocks',
                method: 'POST',
                body: {
                    ...criteria, // Spread existing criteria
                    skip: skip, // Include skip value
                    limit: limit, // Include limit value
                },
            }),
        }),
        simpleFetchStocks: builder.mutation<Stock[], StockCriteriaWithPagination>({
            query: ({ criteria, skip, limit }) => ({
                url: '/api/simplefilterstocks',
                method: 'POST',
                body: {
                    ...criteria, // Spread existing criteria
                    skip: skip, // Include skip value
                    limit: limit, // Include limit value
                },
            }),
        }),
        getStockDetail: builder.query<StockDetail, string>({
            query: (symbol) => `/api/onestock?symbol=${symbol}`,
        }),
        fetchPorfolioStock: builder.mutation<Stock[], string[]>({
            query: (symbols) => ({
                url: '/api/portfoliostocks',
                method: 'POST',
                body: {
                    symbols,
                },
            }),
        }),
        updateStockValues: builder.mutation<void, string>({
            query: (symbol) => ({
                url: '/api/updateStockValues',
                method: 'POST',
                body: { symbol },
            }),
        }),
        getAllPortfolioStocks: builder.query<Stock[], string>({
            query: () => '/api/portfoliostocks',
        }),
        addStockToPortfolio: builder.mutation({
            query: (symbol) => ({
                url: '/api/portfoliostocks',
                method: 'POST',
                body: { symbol },
            }),
        }),
        removeStockFromPortfolio: builder.mutation({
            query: (symbol) => ({
                url: '/api/portfoliostocks',
                method: 'DELETE',
                body: { symbol },
            }),
        }),
        getAllConsiderStocks: builder.query<Stock[], string>({
            query: () => '/api/considerstocks',
        }),
        addStockToConsider: builder.mutation({
            query: (symbol) => ({
                url: '/api/considerstocks',
                method: 'POST',
                body: { symbol },
            }),
        }),
        removeStockFromConsider: builder.mutation({
            query: (symbol) => ({
                url: '/api/considerstocks',
                method: 'DELETE',
                body: { symbol },
            }),
        }),

        getStockSureData: builder.query<StockSureData, string>({
            query: (symbol) => `/api/stocksuredata?symbol=${symbol}`,
        }),
    }),
})

export const {
    useFetchStocksMutation,
    useGetStockDetailQuery,
    useFetchPorfolioStockMutation,
    useSimpleFetchStocksMutation,
    useUpdateStockValuesMutation,
    useGetAllPortfolioStocksQuery,
    useAddStockToPortfolioMutation,
    useRemoveStockFromPortfolioMutation,
    useGetAllConsiderStocksQuery,
    useAddStockToConsiderMutation,
    useRemoveStockFromConsiderMutation,
    useGetStockSureDataQuery,
} = stockApi
