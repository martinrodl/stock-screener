import cron from 'node-cron'

import { saveStockList, updateAllStocksSubdocuments } from '../utils/stockUtils.js'
import { updateStockValuesUtils } from '../utils/updateStockPrice.js'
import { updateBondYield } from '../utils/otherData.js'

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
    updateStockValuesUtils()
})
// Running a task every Sunday at 8:00 AM'
cron.schedule('0 8 * * 0', async () => {
    updateBondYield()
})
