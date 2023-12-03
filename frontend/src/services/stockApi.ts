import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { StockDetail } from "../types/StockDetail";
import { StockCriteria } from "../types/StockCriteria";
import { Stock } from "../types/Stock";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BE_URL }),
  endpoints: (builder) => ({
    fetchStocks: builder.mutation<Stock[], StockCriteria>({
      query: (criteria) => ({
        url: "/api/filterstocks",
        method: "POST",
        body: criteria,
      }),
    }),
    getStockDetail: builder.query<StockDetail, string>({
      query: (symbol) => `/api/onestock?symbol=${symbol}`,
    }),
  }),
});

export const { useFetchStocksMutation, useGetStockDetailQuery } = stockApi;
