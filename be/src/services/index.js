import axios from 'axios'
import { PERIODS } from '../constants/index.js'

export const getStocksList = async (stockListSymbol) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/symbol/${stockListSymbol}?apikey=${process.env.API_KEY}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const getStockBalanceSheet = async (stockSymbol, limit = 10, period = PERIODS.annual) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stockSymbol}?period=${PERIODS[period]}&apikey=${process.env.API_KEY}&limit=${limit}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockBalanceSheet data:', error)
    }
}

export const getStockCashflow = async (stockSymbol, limit = 10, period = PERIODS.annual) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${stockSymbol}?period=${PERIODS[period]}&apikey=${process.env.API_KEY}&limit=${limit}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockCashflow data:', error)
    }
}

export const getStockKeyMetrics = async (stockSymbol, limit = 10, period = PERIODS.annual) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/key-metrics/${stockSymbol}?period=${PERIODS[period]}&apikey=${process.env.API_KEY}&limit=${limit}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockKeyMetrics data:', error)
    }
}

export const getStockCashflowgrowthMetric = async (
    stockSymbol,
    limit = 10,
    period = PERIODS.annual
) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement-growth/${stockSymbol}?period=${PERIODS[period]}&apikey=${process.env.API_KEY}&limit=${limit}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockCashflowgrowthMetric data:', error)
    }
}

export const getStockIncomegrowthMetric = async (
    stockSymbol,
    limit = 10,
    period = PERIODS.annual
) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/income-statement-growth/${stockSymbol}?period=${PERIODS[period]}&apikey=${process.env.API_KEY}&limit=${limit}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockIncomegrowthMetric data:', error)
    }
}

export const getStockIncomeStatement = async (
    stockSymbol,
    limit = 10,
    period = PERIODS.quarter
) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/income-statement/${stockSymbol}?period=${PERIODS[period]}&apikey=${process.env.API_KEY}&limit=${limit}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockIncomeStatement data:', error)
    }
}

export const getStockQuote = async (stockSymbol) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/quote/${stockSymbol}?apikey=${process.env.API_KEY}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockQuote data:', error)
    }
}

export const getStockDCF = async (stockSymbol) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/discounted-cash-flow/${stockSymbol}?apikey=${process.env.API_KEY}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockDCF data:', error)
    }
}

export const getStockPeers = async (stockSymbol) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${stockSymbol}&apikey=${process.env.API_KEY}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching StockPeers data:', error)
    }
}

export const getOutlookData = async (stockSymbol) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v4/company-outlook?symbol=${stockSymbol}&apikey=${process.env.API_KEY}`
        )
        return response.data
    } catch (error) {
        console.error('Error in fetching Outlook data:', error)
    }
}
