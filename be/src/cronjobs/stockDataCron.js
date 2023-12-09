import cron from 'node-cron'

import { saveStockList, updateAllStocksSubdocuments } from '../utils/stockUtils.js'
import { updateStocksPrice } from '../utils/updateStocksPrice.js'
import { fetchBondYield } from '../services/currentYieldUpdate.js'

// Scheduled to run once month
cron.schedule('0 8 1 * *', () => {
    saveStockList('NASDAQ')
})
cron.schedule('0 8 1 * *', () => {
    saveStockList('NYSE')
})
cron.schedule('0 8 1 * *', () => {
    saveStockList('AMEX')
})

// Scheduled to run two times per month
cron.schedule('0 0 1,15 * *', async () => {
    updateAllStocksSubdocuments()
})

// Running a task every day at 6:00 AM'
cron.schedule('0 4 * * *', async () => {
    updateStocksPrice()
})
// Running a task every Sunday at 8:00 AM'
cron.schedule('0 8 * * 0', async () => {
    fetchBondYield()
})
