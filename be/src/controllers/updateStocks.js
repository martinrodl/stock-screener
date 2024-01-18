import Stock from '../models/stockModel.js'
import {
    saveStockList,
    updateKeyMetrics,
    updateGrowthCashflowMetrics,
    updateGrowthIncomegrowthmetrics,
    updateIncomeStatements,
    updateBalancedSheets,
    updateCashflowStatements,
    updateAllStocksSubdocuments,
    updateStocksValuesUtils,
    updateStockOutlookData,
} from '../utils/stockUtils.js'
import { updateStockValuesUtils } from '../utils/updateStockValues.js'
export const launchSaveStockList = async (req, res) => {
    const { exchange } = req.body
    try {
        saveStockList(exchange)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const launchUpdate = (updateFunction) => async (req, res) => {
    const { symbol } = req.body

    try {
        const stock = await Stock.findOne({ symbol })
        updateFunction(stock.symbol)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const launchUpdateGrowthCashflowMetrics = () => launchUpdate(updateGrowthCashflowMetrics)

export const launchUpdateKeyMetrics = launchUpdate(updateKeyMetrics)
export const launchUpdateGrowthIncomeMetrics = launchUpdate(updateGrowthIncomegrowthmetrics)
export const launchUpdateIncomeStatement = launchUpdate(updateIncomeStatements)
export const launchUpdateBalanceSheet = launchUpdate(updateBalancedSheets)
export const launchUpdateCashflowStatement = launchUpdate(updateCashflowStatements)

export const launchUpdateAllStocksSubdocuments = async (req, res) => {
    try {
        updateAllStocksSubdocuments()
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateStockValues = async (req, res) => {
    try {
        const { symbol } = req.body
        await updateStockValuesUtils(symbol)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateStocksValues = async (req, res) => {
    try {
        updateStocksValuesUtils()
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateOutlookData = async (req, res) => {
    const { symbol } = req.body
    try {
        await updateStockOutlookData(symbol)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
