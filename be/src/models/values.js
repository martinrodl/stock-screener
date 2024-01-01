import mongoose from 'mongoose'

const actualValues = new mongoose.Schema(
    {
        exchange: String,
        peRatio: {
            type: Number,
            default: null,
        },
        capeRatio: Number,
        marketCap: Number,
        date: String,
        dcf: Number,
        price: Number,
        intrinsicValueZeroGrowth: Number,
        intrinsicValueAverageGrowth: Number,
        intrinsicValueLastYearGrowth: Number,
        peterlynchValue: Number,
        sharesOutstanding: Number,
        roe10y: Number,
        roe: Number,
        roic: Number,
        roic10y: Number,
        averageProfitGrowth: Number,
        averageDividendGrowth: Number,
        averageNetIncomeGrowth: Number,
        averageProfitMargin: Number,
        profitMargin: Number,
        eps: Number,
        debtPerShare: Number,
        dividendYield: Number,
        dividendYield10y: Number,
        dividendPayoutRatio: Number,
        freeCashFlowPerShare: Number,
        buybackYield: Number,
        buybackPayoutRatio: Number,
        debtToEquity: Number,
        debtToAssets: Number,
        netDebtToEBITDA: Number,
        similarCompanies: [String],
        averagePESimilarCompanies: Number,
        yearReturn: Number,
    },
    { timestamps: true }
)

const Values = mongoose.model('Values', actualValues)

export default Values
