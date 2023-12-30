import cron from 'node-cron'

import { saveStockList, updateAllStocksSubdocuments } from '../utils/stockUtils.js'
import { updateStockValuesUtils } from '../utils/updateStockPrice.js'
import { updateBondYield } from '../utils/otherData.js'

// Scheduled to run once month
cron.schedule('0 8 1 * *', () => {
    console.log('Running a task every 1st of the month - saveStockList - NASDAQ')
    saveStockList('NASDAQ')
})
cron.schedule('0 8 1 * *', () => {
    console.log('Running a task every 1st of the month - saveStockList - NYSE')
    saveStockList('NYSE')
})
cron.schedule('0 8 1 * *', () => {
    console.log('Running a task every 1st of the month - saveStockList - AMEX')
    saveStockList('AMEX')
})

// Scheduled to run two times per month
cron.schedule('0 0 1,15 * *', async () => {
    console.log('Running a task every 1st and 15th of the month - updateAllStocksSubdocuments')
    updateAllStocksSubdocuments()
})

// Running a task every day at 4:00 AM'
cron.schedule('0 4 * * *', async () => {
    console.log('Running a task every day at 6:00 AM - updateStockValuesUtils')
    updateStockValuesUtils()
})
// Running a task every Sunday at 8:00 AM'
cron.schedule('0 8 * * 0', async () => {
    console.log('Running a task every Sunday at 8:00 AM - updateBondYield')
    updateBondYield()
})
