import OtherData from '../models/otherData.js'
import Stock from '../models/stockModel.js'
import {
    getStockIncomeStatement,
    getStockQuote,
    getStockDCF,
    getStockIncomegrowthMetric,
    getStockPeers,
} from '../services/index.js'

import { getFirstArrayElement, calculateAverage } from '../helpers/array.js'

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
            sharesOutstanding: stockQuote.sharesOutstanding,
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
        // Example growth rate 0.05 (5%)
        const otherData = await OtherData.findOne().sort({ _id: -1 })
        const currentYield = otherData.currentYield / 100 // Example current yield on 20-year AAA corporate bonds (3%)
        const averageGrowth =
            stock.growthIncomeMetrics
                .slice(0, 5)
                .reduce((sum, metric) => sum + metric.growthRevenue, 0) / 5
        const lastYearGrowth = getFirstArrayElement(stock.growthIncomeMetrics).growthRevenue
        const intrinsicValueZeroGrowth = (eps * (8.5 + 2 * 0 * 100) * 4.4) / (currentYield * 100)
        const intrinsicValue10yGrowth =
            (eps * (8.5 + 2 * averageGrowth * 100) * 4.4) / (currentYield * 100)
        const intrinsicValueLastYearGrowth =
            (eps * (8.5 + 2 * lastYearGrowth * 100) * 4.4) / (currentYield * 100)

        stock.values.intrinsicValueZeroGrowth = intrinsicValueZeroGrowth
        stock.values.intrinsicValueAverageGrowth = intrinsicValue10yGrowth
        stock.values.intrinsicValueLastYearGrowth = intrinsicValueLastYearGrowth
        stock.values.eps = eps
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

export const calculateCapeRatio = async (ticker) => {
    try {
        const stock = await Stock.findOne({ symbol: ticker })
        if (!stock) {
            throw new Error(`Stock with symbol ${ticker} not found`)
        }
        const calculateAverageEPS = (incomeStatements, sharesOutstanding) => {
            const totalEPS = incomeStatements.reduce((sum, statement) => {
                const eps = statement.netIncome / sharesOutstanding
                return sum + eps
            }, 0)
            return totalEPS / incomeStatements.length
        }
        const incomeStatements = await getStockIncomeStatement(ticker)
        const averageEPS = calculateAverageEPS(incomeStatements, stock.values.sharesOutstanding)

        const capeRatio = stock.values.price / averageEPS
        stock.values.capeRatio = capeRatio
        await stock.save()
    } catch (error) {
        console.error('Error calculating CAPE ratio:', error)
        return null
    }
}

export const calculateROEROIC = async (ticker) => {
    const stock = await Stock.findOne({ symbol: ticker })
    if (!stock) {
        throw new Error(`Stock with symbol ${ticker} not found`)
    }
    const roe = stock.keyMetrics[0].roe
    const roic = stock.keyMetrics[0].roic
    const roe10y = calculateAverage(stock.keyMetrics, 'roe', 10)
    const roic10y = calculateAverage(stock.keyMetrics, 'roic', 10)
    stock.values.roe = roe
    stock.values.roic = roic
    stock.values.roe10y = roe10y
    stock.values.roic10y = roic10y
    await stock.save()
}

export const calculateAverages = async (ticker) => {
    const stock = await Stock.findOne({ symbol: ticker })
    if (!stock) {
        throw new Error(`Stock with symbol ${ticker} not found`)
    }
    const averageNetIncomeGrowth = calculateAverage(
        stock.growthIncomeMetrics,
        'growthNetIncome',
        10
    )
    const averageDividendGrowth = calculateAverage(stock.growthIncomeMetrics, 'growthDividend', 10)
    const averageRevenueGrowth = calculateAverage(stock.growthIncomeMetrics, 'growthRevenue', 10)
    const averageProfitMargin =
        calculateAverage(stock.incomeStatements, 'netIncome', 10) /
        calculateAverage(stock.incomeStatements, 'revenue', 10)
    const dividendYield10y = calculateAverage(stock.keyMetrics, 'dividendYield', 10)

    stock.values.averageNetIncomeGrowth = averageNetIncomeGrowth
    stock.values.averageDividendGrowth = averageDividendGrowth
    stock.values.averageRevenueGrowth = averageRevenueGrowth
    stock.values.averageProfitMargin = averageProfitMargin
    stock.values.dividendYield10y = dividendYield10y
    await stock.save()
}

export const calculateStockValues = async (ticker) => {
    const stock = await Stock.findOne({ symbol: ticker })
    if (!stock) {
        throw new Error(`Stock with symbol ${ticker} not found`)
    }
    const profitMargin = stock.incomeStatements[0].netIncome / stock.incomeStatements[0].revenue
    const debtPerShare = stock.balanceSheetStatements[0].totalDebt / stock.values.sharesOutstanding
    const dividendYield = stock.keyMetrics[0].dividendYield
    const dividendPayoutRatio = stock.keyMetrics[0].payoutRatio
    const freeCashFlowPerShare = stock.keyMetrics[0].freeCashFlowPerShare
    const netDebtToEBITDA = stock.keyMetrics[0].netDebtToEBITDA
    const debtToEquity = stock.keyMetrics[0].debtToEquity
    const debtToAssets = stock.keyMetrics[0].debtToAssets
    const buybackYield = stock.cashflowStatements[0].commonStockIssued / stock.values.marketCap
    const buybackPayoutRatio =
        stock.cashflowStatements[0].commonStockIssued / stock.incomeStatements[0].netIncome
    stock.values.profitMargin = profitMargin
    stock.values.debtPerShare = debtPerShare
    stock.values.dividendYield = dividendYield
    stock.values.dividendPayoutRatio = dividendPayoutRatio
    stock.values.freeCashFlowPerShare = freeCashFlowPerShare
    stock.values.buybackYield = buybackYield
    stock.values.buybackPayoutRatio = buybackPayoutRatio
    stock.values.debtToEquity = debtToEquity
    stock.values.debtToAssets = debtToAssets
    stock.values.netDebtToEBITDA = netDebtToEBITDA
    await stock.save()
}

export const calculateSimilarCompanies = async (ticker) => {
    const stock = await Stock.findOne({ symbol: ticker })
    if (!stock) {
        throw new Error(`Stock with symbol ${ticker} not found`)
    }
    const peerListResponse = await getStockPeers(ticker)
    const peersList = getFirstArrayElement(peerListResponse).peersList
    stock.values.similarCompanies = peersList

    let sumPE = 0
    let validCount = 0

    for (const peer of peersList) {
        try {
            const stockQuoteResponse = await getStockQuote(peer)
            const stockQuote = getFirstArrayElement(stockQuoteResponse)

            if (stockQuote && typeof stockQuote.pe === 'number') {
                sumPE += stockQuote.pe
                validCount++
            }
        } catch (error) {
            console.error(`Error fetching stock quote for ${peer}:`, error)
        }
    }
    const averagePE = sumPE / validCount
    stock.values.averagePESimilarCompanies = averagePE

    await stock.save()
}

const calculateYearReturn = async (ticker) => {
    const stock = await Stock.findOne({ symbol: ticker })
    if (!stock) {
        throw new Error(`Stock with symbol ${ticker} not found`)
    }
    const currentPrice = stock.values.price
    const currentEPS = stock.values.eps
    const futurePE = stock.values.peRatio
    const growthRate = stock.values.averageNetIncomeGrowth
    const dividendYield = stock.values.dividendYield

    const futureEPS = currentEPS * Math.pow(1 + growthRate, 5)
    const futureStockPrice = futureEPS * futurePE
    const totalDividends = currentPrice * dividendYield * 5
    const futureTotalValue = futureStockPrice + totalDividends
    const annualizedReturn = Math.pow(futureTotalValue / currentPrice, 1 / 5) - 1
    stock.values.yearReturn = annualizedReturn
    await stock.save()
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
        await calculateCapeRatio(ticker)
    } catch (error) {
        console.error('Error in fetching stock updateDCFValue data:', error)
    }
    try {
        await calculatePeterLynchFairValue(ticker)
    } catch (error) {
        console.error('Error in fetching stock calculatePeterLynchFairValue data:', error)
    }
    try {
        await calculateROEROIC(ticker)
    } catch (error) {
        console.error('Error  calculateROEROIC data:', error)
    }
    try {
        await calculateAverages(ticker)
    } catch (error) {
        console.error('Error  calculateAverages data:', error)
    }
    try {
        await calculateStockValues(ticker)
    } catch (error) {
        console.error('Error  calculateStockValues data:', error)
    }
    try {
        await calculateSimilarCompanies(ticker)
    } catch (error) {
        console.error('Error  calculateSimilarCompanies data:', error)
    }
    try {
        await calculateYearReturn(ticker)
    } catch (error) {
        console.error('Error  calculateYearReturn data:', error)
    }
}
