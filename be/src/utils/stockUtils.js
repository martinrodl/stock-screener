import Stock from '../models/stockModel.js'
import OtherData from '../models/otherData.js'

import {
    getStocksList,
    getStockKeyMetrics,
    getStockCashflowgrowthMetric,
    getStockIncomegrowthMetric,
    getStockIncomeStatement,
    getStockBalanceSheet,
    getStockCashflow,
    getOutlookData,
} from '../services/index.js'
import { delay } from '../helpers/delay.js'
import { updateStockValuesUtils } from './updateStockValues.js'

export const saveStockList = async (stockList) => {
    console.log('Saving stock list')
    try {
        const stocks = await getStocksList(stockList)
        const otherData = await OtherData.findOne().sort({ _id: -1 })
        const minMarketCap = otherData.minMarketCap
        for (const stock of stocks) {
            if (stock.marketCap < minMarketCap) {
                continue
            }
            if (!stock.pe) {
                continue
            }
            try {
                console.log('Saving stock:', stock.symbol)
                await Stock.findOneAndUpdate(
                    { symbol: stock.symbol },
                    {
                        symbol: stock.symbol,
                        name: stock.name,
                        values: {
                            exchange: stock.exchange,
                            peRatio: stock.pe,
                            marketCap: stock.marketCap,
                            date: stock.timestamp,
                            price: stock.price,
                        },
                    },
                    { upsert: true }
                )
            } catch (error) {
                console.error('Error in fetching stock data:', error)
                continue
            }
        }
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateKeyMetrics = async (stockSymbol, limit = 10) => {
    try {
        const keyMetrics = await getStockKeyMetrics(stockSymbol, limit)
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        console.log('Updating key metrics of ', stock.symbol)
        for (const metric of keyMetrics) {
            const dateExists = stock.keyMetrics.some((km) => km.date === metric.date)

            if (!dateExists) {
                // Add metric if the date does not exist
                stock.keyMetrics.push(metric)
            }
        }
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateGrowthCashflowMetrics = async (stockSymbol, limit = 10) => {
    try {
        const cashflowMetrics = await getStockCashflowgrowthMetric(stockSymbol, limit)
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        for (const metric of cashflowMetrics) {
            const dateExists = stock.growthCashflowtMetrics.some((gm) => gm.date === metric.date)

            if (!dateExists) {
                // Add metric if the date does not exist
                stock.growthCashflowtMetrics.push(metric)
            }
        }
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateGrowthIncomegrowthmetrics = async (stockSymbol, limit = 10) => {
    try {
        const keyMetrics = await getStockIncomegrowthMetric(stockSymbol, limit)
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        for (const metric of keyMetrics) {
            const dateExists = stock.growthIncomeMetrics.some((gm) => gm.date === metric.date)

            if (!dateExists) {
                // Add metric if the date does not exist
                stock.growthIncomeMetrics.push(metric)
            }
        }
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}
export const updateIncomeStatements = async (stockSymbol, limit = 10) => {
    try {
        const incomeStatements = await getStockIncomeStatement(stockSymbol, limit)
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        for (const statement of incomeStatements) {
            const dateExists = stock.incomeStatements.some((doc) => doc.date === statement.date)

            if (!dateExists) {
                // Add metric if the date does not exist
                stock.incomeStatements.push(statement)
            }
        }
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateBalancedSheets = async (stockSymbol, limit = 10) => {
    try {
        const balancedSheets = await getStockBalanceSheet(stockSymbol, limit)
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        for (const balancedsheet of balancedSheets) {
            const dateExists = stock.balanceSheetStatements.some(
                (doc) => doc.date === balancedsheet.date
            )

            if (!dateExists) {
                // Add metric if the date does not exist
                stock.balanceSheetStatements.push(balancedsheet)
            }
        }
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateCashflowStatements = async (stockSymbol, limit = 10) => {
    try {
        const cashflowStatements = await getStockCashflow(stockSymbol, limit)
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        for (const statement of cashflowStatements) {
            const dateExists = stock.cashflowStatements.some((doc) => doc.date === statement.date)

            if (!dateExists) {
                // Add metric if the date does not exist
                stock.cashflowStatements.push(statement)
            }
        }
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateStockOutlookData = async (stockSymbol) => {
    try {
        const stock = await Stock.findOne({ symbol: stockSymbol })
        if (!stock) {
            throw new Error(`Stock with symbol ${stockSymbol} not found`)
        }
        const outLookData = await getOutlookData(stockSymbol)
        if (!stock.outlookData) {
            stock.outlookData = {}
        }
        stock.outlookData.description = outLookData.profile.description
        stock.outlookData.sector = outLookData.profile.sector
        stock.outlookData.industry = outLookData.profile.industry
        stock.outlookData.country = outLookData.profile.country
        stock.outlookData.isEtf = outLookData.profile.isEtf
        stock.outlookData.fullTimeEmployees = outLookData.profile.fullTimeEmployees
        stock.outlookData.splitsHistory = outLookData.splitsHistory
        stock.outlookData.stockDividends = outLookData.stockDividend
        stock.outlookData.stockNews = outLookData.stockNews
        stock.outlookData.ratings = outLookData.rating
        // stock.outlookData.quarter = outLookData.financialsQuarter
        await stock.save()
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateAllStocksSubdocuments = async () => {
    try {
        const stocks = await Stock.find({})

        for (const stock of stocks) {
            console.log('Updating all subdocuments for:', stock.symbol)
            try {
                try {
                    console.log('Updating stock outlook data for:', stock.symbol)
                    await updateStockOutlookData(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }
                try {
                    console.log('Updating key metrics for:', stock.symbol)
                    await updateKeyMetrics(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }
                try {
                    console.log('Updating growth cashflow metrics for:', stock.symbol)
                    await updateGrowthCashflowMetrics(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }
                try {
                    console.log('Updating growth income metrics for:', stock.symbol)
                    await updateGrowthIncomegrowthmetrics(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }
                try {
                    console.log('Updating income statements for:', stock.symbol)
                    await updateIncomeStatements(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }
                try {
                    console.log('Updating balanced sheets for:', stock.symbol)
                    await updateBalancedSheets(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }
                try {
                    console.log('Updating cashflow statements for:', stock.symbol)
                    await updateCashflowStatements(stock.symbol)
                } catch (error) {
                    console.error('Error in fetching stock data:', error)
                }

                delay(1500) // Delay to avoid rate limiting
            } catch (error) {
                console.error('Error in fetching stock data:', error)
            }
        }
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}

export const updateStocksValuesUtils = async () => {
    try {
        const stocks = await Stock.find({})
        for (const stock of stocks) {
            try {
                console.log('Updating stock values for:', stock.symbol)
                await updateStockValuesUtils(stock.symbol)
            } catch (error) {
                console.error('Error in fetching stock data:', error)
                continue
            }
        }
    } catch (error) {
        console.error('Error in fetching stock data:', error)
    }
}
