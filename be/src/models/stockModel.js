import mongoose from 'mongoose'

import KeyMetrics from './keyMetrics.js'
import growthProfitMetrics from './growthProfitMetrics.js'
import growthIncomeMetrics from './growthIncomeMetrics.js'
import balanceSheetStatement from './balanceSheet.js'
import incomeStatement from './incomeStatement.js'
import cashflowStatement from './cashflowStatement.js'
import values from './values.js'
import sureData from './sureData.js'
import outlookData from './outlookData.js'

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    keyMetrics: { type: [KeyMetrics.schema], required: true },
    growthIncomeMetrics: { type: [growthIncomeMetrics.schema], required: true },
    growthCashflowtMetrics: {
        type: [growthProfitMetrics.schema],
        required: true,
    },
    balanceSheetStatements: {
        type: [balanceSheetStatement.schema],
        required: true,
    },
    balanceSheetStatementsQuarters: {
        type: [balanceSheetStatement.schema],
        required: true,
    },
    incomeStatements: { type: [incomeStatement.schema], required: true },
    incomeStatementsQuarters: { type: [incomeStatement.schema], required: true },
    cashflowStatements: { type: [cashflowStatement.schema], required: true },
    cashflowStatementsQuarters: { type: [cashflowStatement.schema], required: true },
    values: { type: values.schema },
    sureData: { type: sureData.schema },
    outlookData: { type: outlookData.schema },
})

const Stock = mongoose.model('Stock', stockSchema)

export default Stock
