import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { UpdatePortfolioDto, UpdateConsiderDto } from './types'
import type { RootState } from '../store/RootState'

export const APP_BASE_URI = import.meta.env.VITE_BE_URL_BE_NEST

export const beApi = createApi({
    reducerPath: 'beApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_BASE_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        addStockToPortfolioBySymbol: build.mutation<void, { symbol: string }>({
            async queryFn({ symbol }, _queryApi, _extraOptions, fetchWithBQ) {
                const stockResult = await fetchWithBQ(`be-nest-stocks/api/stocks/${symbol}`)
                if (stockResult.error) return { error: stockResult.error as FetchBaseQueryError }

                const stock = stockResult.data
                if (!stock || !stock.id)
                    return {
                        error: {
                            status: 404,
                            statusText: 'Stock not found',
                        } as FetchBaseQueryError,
                    }

                const portfolioResult = await fetchWithBQ({
                    url: `be-nest-stocks/api/user/portfolio`,
                    method: 'PUT',
                    body: { stockId: stock.id } as UpdatePortfolioDto,
                })

                return portfolioResult.data
                    ? { data: portfolioResult.data }
                    : { error: portfolioResult.error as FetchBaseQueryError }
            },
        }),
        addStockToConsiderBySymbol: build.mutation<void, { symbol: string }>({
            async queryFn({ symbol }, _queryApi, _extraOptions, fetchWithBQ) {
                const stockResult = await fetchWithBQ(`be-nest-stocks/api/stocks/${symbol}`)
                if (stockResult.error) return { error: stockResult.error as FetchBaseQueryError }

                const stock = stockResult.data
                if (!stock || !stock.id)
                    return {
                        error: {
                            status: 404,
                            statusText: 'Stock not found',
                        } as FetchBaseQueryError,
                    }

                const considerResult = await fetchWithBQ({
                    url: `be-nest-stocks/api/user/consider`,
                    method: 'PUT',
                    body: { stockId: stock.id } as UpdateConsiderDto,
                })

                return considerResult.data
                    ? { data: considerResult.data }
                    : { error: considerResult.error as FetchBaseQueryError }
            },
        }),
        filterControllerFindByUser2: build.query({
            query: () => ({ url: `be-nest-stocks/api/filters/userFilters` }),
        }),
    }),
    overrideExisting: true,
})

export const {
    useAddStockToPortfolioBySymbolMutation,
    useAddStockToConsiderBySymbolMutation,
    useFilterControllerFindByUser2Query,
} = beApi
