import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { StockDetail } from '../types/StockDetail'
import { StockCriteria } from '../types/StockCriteria'
import { Stock } from '../types/Stock'

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
        getStockDetail: builder.query<StockDetail, string>({
            query: (symbol) => `/api/onestock?symbol=${symbol}`,
        }),
    }),
})

export const { useFetchStocksMutation, useGetStockDetailQuery } = stockApi
