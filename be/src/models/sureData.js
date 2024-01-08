import mongoose from 'mongoose'

const stockAnalysisSchema = new mongoose.Schema(
    {
        Rating: String,
        PriceAtTimeOfRating: Number,
        StockPrice: Number,
        FairValuePrice: Number,
        PercentFairValue: Number,
        DividendYield: Number,
        ValuationReturn: Number,
        GrowthReturn: Number,
        ExpectedTotalReturn: Number,
        DividendRiskScore: String,
        RetirementSuitabilityScore: String,
        PERatio: Number,
        ForwardEPSEstimate: Number,
        AnnualDividendPayments: Number,
        PayoutRatio: Number,
        YearsOfDividendGrowth: Number,
        DividendGrowthRate: Number,
        ExDividendDate: String,
        Trailing1YearTotalReturn: Number,
        SecurityType: String,
        International: Boolean,
        Sector: String,
        MarketCap: Number,
        LastReportUpload: String,
        Analyst: String,
    },
    { timestamps: true }
)

const StockAnalysis = mongoose.model('StockAnalysis', stockAnalysisSchema)

export default StockAnalysis
