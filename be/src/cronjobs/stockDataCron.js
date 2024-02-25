import cron from 'node-cron'

import {
    saveStockList,
    updateAllStocksSubdocuments,
    updateAllStockOutlookData,
} from '../utils/stockUtils.js'
import { updateStocksValuesUtils } from '../utils/updateStockValues.js'
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

cron.schedule('0 0 10 1,3,5,7,9,11 *', async () => {
    console.log('Running a task on the 1st of every two months - updateAllStocksSubdocuments')
    updateAllStocksSubdocuments()
})

// Scheduled to run two times per month
cron.schedule('0 0 1,15 * *', async () => {
    console.log('Running a task every 1st and 15th of the month - updateAllStocksSubdocuments')
    updateAllStockOutlookData()
})

// Running a task every day at 4:00 AM'
cron.schedule('0 4 * * *', async () => {
    console.log('Running a task every day at 6:00 AM - updateStockValuesUtils')
    updateStocksValuesUtils()
})
// Running a task every Sunday at 8:00 AM'
cron.schedule('0 8 * * 0', async () => {
    console.log('Running a task every Sunday at 8:00 AM - updateBondYield')
    updateBondYield()
})
