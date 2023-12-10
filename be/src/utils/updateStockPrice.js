import OtherData from '../models/otherData.js'
import Stock from '../models/stockModel.js'
import {
    getStockIncomeStatement,
    getStockQuote,
    getStockDCF,
    getStockIncomegrowthMetric,
} from '../services/index.js'

import { getFirstArrayElement } from '../helpers/array.js'

export const updateStockPrice = async (ticker) => {
    try {
        const stock = await Stock.findOne({ symbol: ticker })
        if (!stock) {
            throw new Error(`Stock with symbol ${ticker} not found`)
        }
        const stockQuoteResponse = await getStockQuote(ticker)
        const stockQuote = getFirstArrayElement(stockQuoteResponse)
        if (!stockQuote) {
            throw new Error(`Stock quote with symbol ${ticker} not found`)
        }

        stock.values = {
            peRatio: stockQuote.pe,
            marketCap: stockQuote.marketCap,
            date: stockQuote.timestamp,
            price: stockQuote.price,
        }

        await stock.save()
    } catch (error) {
        console.error('Error fetching financial data:', error.message)
        throw new Error('Error fetching financial data:' + error.message)
    }
}

export const updateIntrinsicValue = async (ticker) => {
    try {
        const stock = await Stock.findOne({ symbol: ticker })
        if (!stock) {
            throw new Error(`Stock with symbol ${ticker} not found`)
        }
        const stockQuoteResponse = await getStockQuote(ticker)
        const stockQuote = getFirstArrayElement(stockQuoteResponse)
        if (!stockQuote) {
            throw new Error(`Stock quote with symbol ${ticker} not found`)
        }
        const outstandingShares = stockQuote.sharesOutstanding

        const incomeResponse = await getStockIncomeStatement(ticker)
        const netIncomeData = getFirstArrayElement(incomeResponse)
        if (!netIncomeData) {
            throw new Error(`Net income data with symbol ${ticker} not found`)
        }
        const netIncome = netIncomeData.netIncome
        const eps = netIncome / outstandingShares

        // Calculate Intrinsic Value using the Graham Formula
        // Intrinsic value = [EPS × (8.5 + 2g) × 4.4]/Y
        const estimatedGrowthRate = 0.05 // Example growth rate (5%)
        const otherData = await OtherData.findOne().sort({ _id: -1 })
        const currentYield = otherData.currentYield / 100 // Example current yield on 20-year AAA corporate bonds (3%)
        const intrinsicValue =
            (eps * (8.5 + 2 * estimatedGrowthRate * 100) * 4.4) / (currentYield * 100)

        stock.values.intrinsicValue = intrinsicValue
        await stock.save()
    } catch (error) {
        throw new Error('Error update intrinsic value:' + error.message)
    }
}

export const updateDCFValue = async (ticker) => {
    try {
        const stock = await Stock.findOne({ symbol: ticker })
        if (!stock) {
            throw new Error(`Stock with symbol ${ticker} not found`)
        }
        const dcfResponse = await getStockDCF(ticker)
        const dfcData = getFirstArrayElement(dcfResponse)
        stock.values.dcf = dfcData ? dfcData.dcf : null
        await stock.save()
    } catch (error) {
        throw new Error('Error update dcf value:' + error.message)
    }
}

const calculatePeterLynchFairValue = async (ticker) => {
    try {
        const stock = await Stock.findOne({ symbol: ticker })
        if (!stock) {
            throw new Error(`Stock with symbol ${ticker} not found`)
        }

        const stockIncomegrowthMetricResponse = await getStockIncomegrowthMetric(ticker)
        const stockIncomegrowthMetric = getFirstArrayElement(stockIncomegrowthMetricResponse)
        if (!stockIncomegrowthMetric) {
            throw new Error(`Stock Incomegrowth Metric with symbol ${ticker} not found`)
        }

        const stockQuoteResponse = await getStockQuote(ticker)
        const stockQuote = getFirstArrayElement(stockQuoteResponse)
        if (!stockQuote) {
            throw new Error(`Stock quote with symbol ${ticker} not found`)
        }
        const outstandingShares = stockQuote.sharesOutstanding

        const incomeResponse = await getStockIncomeStatement(ticker)
        const netIncomeData = getFirstArrayElement(incomeResponse)
        if (!netIncomeData) {
            throw new Error(`Net income data with symbol ${ticker} not found`)
        }
        const netIncome = netIncomeData.netIncome
        const eps = netIncome / outstandingShares

        const growthRate = stockIncomegrowthMetric.growthRevenue // Assuming revenue growth as a proxy for earnings growth
        // Peter Lynch Fair Value Calculation
        const peForNoGrowthCompany = 15 // This can be adjusted
        const fairValue = eps * (peForNoGrowthCompany + growthRate)
        stock.values.peterlynchValue = fairValue
        await stock.save()
    } catch (error) {
        console.error('Error calculating Peter Lynch Fair Value:', error.message)
        return null
    }
}

export const updateStockValuesUtils = async (ticker) => {
    try {
        await updateStockPrice(ticker)
    } catch (error) {
        console.error('Error in fetching stock updateStockValuesUtils data:', error)
    }
    try {
        await updateIntrinsicValue(ticker)
    } catch (error) {
        console.error('Error in fetching stock updateIntrinsicValue data:', error)
    }
    try {
        await updateDCFValue(ticker)
    } catch (error) {
        console.error('Error in fetching stock updateDCFValue data:', error)
    }

    try {
        await calculatePeterLynchFairValue(ticker)
    } catch (error) {
        console.error('Error in fetching stock calculatePeterLynchFairValue data:', error)
    }
}
