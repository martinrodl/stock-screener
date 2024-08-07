import { beGeneratedApi } from './beGeneratedApi'

const extendedApi = beGeneratedApi.injectEndpoints({
    endpoints: (build) => ({
        getMetricsWithProperties: build.query<
            StocksControllerGetMetricsApiResponse,
            StocksControllerGetMetricsApiArg & { properties: string[] }
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/metrics/${queryArg.identifier}`,
                params: {
                    periodType: queryArg.periodType,
                    properties: queryArg.properties.join(','),
                },
            }),
        }),
        getStatementsWithProperties: build.query<
            StocksControllerGetStatementsApiResponse,
            StocksControllerGetStatementsApiArg & { properties: string[] }
        >({
            query: (queryArg) => ({
                url: `/be-nest-stocks/api/stocks/statements/${queryArg.identifier}`,
                params: {
                    periodType: queryArg.periodType,
                    properties: queryArg.properties.join(','),
                },
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetMetricsWithPropertiesQuery,
    useLazyGetMetricsWithPropertiesQuery,
    useGetStatementsWithPropertiesQuery,
    useLazyGetStatementsWithPropertiesQuery,
} = extendedApi
