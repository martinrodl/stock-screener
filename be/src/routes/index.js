import express from 'express'
import { getStatus } from '../controllers/status.js'
import { getAllStocks, getStock, getStockSureData } from '../controllers/stocks.js'
import {
    launchSaveStockList,
    launchUpdateKeyMetrics,
    launchUpdateGrowthCashflowMetrics,
    launchUpdateGrowthIncomeMetrics,
    launchUpdateIncomeStatement,
    launchUpdateBalanceSheet,
    launchUpdateCashflowStatement,
    launchUpdateAllStocksSubdocuments,
    updateStockValues,
    updateStocksValues,
    updateOutlookData,
    launchAllStocksOutlookData,
} from '../controllers/updateStocks.js'

import { filterStocks, simpleFilterStocks } from '../controllers/filterStocks.js'
import { updateBondYield } from '../controllers/otherData.js'
import {
    addStockToConsider,
    addStockToPortfolio,
    getAllConsiderStocks,
    getAllPortfolioStocks,
    removeStockFromPortfolio,
    removeStockFromConsider,
} from '../controllers/portfolioStock.js'

import { updateExcel } from '../controllers/sureExcel.js'
import { fileUploadController } from '../controllers/uploadFile.js'

const router = express.Router()

// Status route
router.get('/status', getStatus) // Route to get the status of the server

// Stock routes
router.get('/onestock', getStock) // Route to get all stocks from the database
router.get('/stocksuredata', getStockSureData)
router.get('/stocks', getAllStocks) // Route to get all stocks from the database
router.get('/portfoliostocks', getAllPortfolioStocks) // Route to get all stocks from the database
router.post('/portfoliostocks', addStockToPortfolio) // Route to post a stock to the portfolio
router.delete('/portfoliostocks', removeStockFromPortfolio) // Route to delete a stock from the portfolio
router.get('/considerstocks', getAllConsiderStocks) // Route to get all stocks from the database
router.post('/considerstocks', addStockToConsider) // Route to post a stock to the portfolio
router.delete('/considerstocks', removeStockFromConsider) // Route to post a stock to the portfolio

// Update excel
router.post('/updateexcel', fileUploadController, updateExcel)

// Update routes
router.post('/launchsavestockslist', launchSaveStockList) // Route to launch the saveStockList function
router.post('/launchupdatekeymetrics', launchUpdateKeyMetrics) // Route to launch the updateKeyMetrics function
router.post('/launchUpdateGrowthCashflowMetrics', launchUpdateGrowthCashflowMetrics) // Route to launch the updateGrowthMetrics function
router.post('/launchupdategrowthincomemetrics', launchUpdateGrowthIncomeMetrics) // Route to launch the updateGrowthIncomeMetrics function

router.post('/launchupdateincomestatement', launchUpdateIncomeStatement) // Route to launch the updateIncomeStatement function
router.post('/launchUpdateBalanceSheet', launchUpdateBalanceSheet) // Route to launch the updateIncomeStatement function
router.post('/launchUpdateCashflowStatement', launchUpdateCashflowStatement) // Route to launch the updateIncomeStatement function
router.post('/launchUpdateAllStocksSubdocuments', launchUpdateAllStocksSubdocuments) // Route to launch the updateIncomeStatement function
router.post('/updateStockValues', updateStockValues)
router.post('/updateStocksValues', updateStocksValues)
router.post('/updateOutlookData', updateOutlookData)
router.post('/launchallstocksoutlookdata', launchAllStocksOutlookData)

// Filter routes
router.post('/filterstocks', filterStocks) // Route to filter stock
router.post('/simplefilterstocks', simpleFilterStocks) // Route to filter stock

// Other data routes
router.post('/updatebondyield', updateBondYield) // Route to update bond yield

export default router
