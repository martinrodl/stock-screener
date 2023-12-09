import axios from 'axios'
import OtherData from '../models/otherData.js'
import Stock from '../models/stockModel.js'

import { getFirstArrayElement } from '../helpers/array.js'

export const updateStockPrice = async (ticker) => {
    const urls = {
        quote: `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${process.env.API_KEY}`,
        incomeStatement: `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?limit=1&apikey=${process.env.API_KEY}`,
        companyProfile: `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${process.env.API_KEY}`,
        dcf: `https://financialmodelingprep.com/api/v3/discounted-cash-flow/${ticker}?apikey=${process.env.API_KEY}`,
    }

    try {
        const stock = await Stock.findOne({ symbol: ticker })
        if (!stock) {
            throw new Error(`Stock with symbol ${ticker} not found`)
        }

        const stockQuoteResponse = await axios.get(urls.quote)
        const stockQuote = getFirstArrayElement(stockQuoteResponse.data)
        if (!stockQuote) {
            throw new Error(`Stock quote with symbol ${ticker} not found`)
        }

        const incomeResponse = await axios.get(urls.incomeStatement)

        const netIncomeData = getFirstArrayElement(incomeResponse.data)
        if (!netIncomeData) {
            throw new Error(`Net income data with symbol ${ticker} not found`)
        }
        const netIncome = netIncomeData.netIncome
        // Fetch Net Income

        const dcfResponse = await axios.get(urls.dcf)

        const dfcData = getFirstArrayElement(dcfResponse.data)

        const outstandingShares = stockQuote.sharesOutstanding
        const eps = netIncome / outstandingShares

        // Calculate Intrinsic Value using the Graham Formula
        // Intrinsic value = [EPS × (8.5 + 2g) × 4.4]/Y
        const estimatedGrowthRate = 0.05 // Example growth rate (5%)
        const otherData = await OtherData.findOne().sort({ _id: -1 })
        const currentYield = otherData.currentYield / 100 // Example current yield on 20-year AAA corporate bonds (3%)
        const intrinsicValue =
            (eps * (8.5 + 2 * estimatedGrowthRate * 100) * 4.4) / (currentYield * 100)

        stock.values = {
            peRatio: stockQuote.pe,
            marketCap: stockQuote.marketCap,
            date: stockQuote.timestamp,
            dcf: dfcData ? dfcData.dcf : null,
            price: stockQuote.price,
            intrinsicValue: intrinsicValue,
        }

        await stock.save()
    } catch (error) {
        console.error('Error fetching financial data:', error.message)
        throw new Error('Error fetching financial data:' + error.message)
    }
}
