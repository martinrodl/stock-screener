import mongoose from 'mongoose'

const outLookData = new mongoose.Schema(
    {
        description: String,
        sector: String,
        industry: String,
        country: String,
        isEtf: Boolean,
        fullTimeEmployees: Number,
        splitsHistory: {
            type: [
                {
                    date: Date,
                    numerator: Number,
                    denominator: Number,
                },
            ],
        },
        stockDividends: {
            type: [
                {
                    date: Date,
                    dividend: Number,
                },
            ],
        },
        stockNews: {
            type: [
                {
                    date: Date,
                    title: String,
                    text: String,
                    site: String,
                    url: String,
                },
            ],
        },
        ratings: {
            type: [
                {
                    date: Date,
                    rating: Number,
                    ratingScore: Number,
                    ratingRecommendation: String,
                    ratingDetailsDCFScore: Number,
                    ratingDetailsDCFRecommendation: String,
                    ratingDetailsROEScore: Number,
                    ratingDetailsROERecommendation: String,
                    ratingDetailsROAScore: Number,
                    ratingDetailsROARecommendation: String,
                    ratingDetailsDEScore: Number,
                    ratingDetailsDERecommendation: String,
                    ratingDetailsPEScore: Number,
                    ratingDetailsPERecommendation: String,
                    ratingDetailsPBScore: Number,
                    ratingDetailsPBRecommendation: String,
                },
            ],
        },
        insideTrades: {
            type: [
                {
                    date: Date,
                    shares: Number,
                    value: Number,
                    type: String,
                    price: Number,
                },
            ],
        },
        quarter: {
            type: [
                {
                    date: Date,
                    revenue: Number,
                    earnings: Number,
                    earningsPerShare: Number,
                    cash: Number,
                    debt: Number,
                    freeCashFlow: Number,
                    operatingCashFlow: Number,
                    operatingIncome: Number,
                    operatingRevenue: Number,
                    totalAssets: Number,
                    totalLiabilities: Number,
                    totalRevenue: Number,
                    totalShareholderEquity: Number,
                },
            ],
        },
    },
    { timestamps: true, strict: false }
)

const Outlook = mongoose.model('OutlookData', outLookData)

export default Outlook
