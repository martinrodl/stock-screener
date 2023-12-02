import mongoose from "mongoose";

const balanceSheetSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    symbol: { type: String, required: true },
    reportedCurrency: String,
    cik: String,
    fillingDate: Date,
    acceptedDate: Date,
    calendarYear: String,
    period: String,
    cashAndCashEquivalents: Number,
    shortTermInvestments: Number,
    cashAndShortTermInvestments: Number,
    netReceivables: Number,
    inventory: Number,
    otherCurrentAssets: Number,
    totalCurrentAssets: Number,
    propertyPlantEquipmentNet: Number,
    goodwill: Number,
    intangibleAssets: Number,
    goodwillAndIntangibleAssets: Number,
    longTermInvestments: Number,
    taxAssets: Number,
    otherNonCurrentAssets: Number,
    totalNonCurrentAssets: Number,
    otherAssets: Number,
    totalAssets: Number,
    accountPayables: Number,
    shortTermDebt: Number,
    taxPayables: Number,
    deferredRevenue: Number,
    otherCurrentLiabilities: Number,
    totalCurrentLiabilities: Number,
    longTermDebt: Number,
    deferredRevenueNonCurrent: Number,
    deferredTaxLiabilitiesNonCurrent: Number,
    otherNonCurrentLiabilities: Number,
    totalNonCurrentLiabilities: Number,
    otherLiabilities: Number,
    capitalLeaseObligations: Number,
    totalLiabilities: Number,
    preferredStock: Number,
    commonStock: Number,
    retainedEarnings: Number,
    accumulatedOtherComprehensiveIncomeLoss: Number,
    othertotalStockholdersEquity: Number,
    totalStockholdersEquity: Number,
    totalEquity: Number,
    totalLiabilitiesAndStockholdersEquity: Number,
    minorityInterest: Number,
    totalLiabilitiesAndTotalEquity: Number,
    totalInvestments: Number,
    totalDebt: Number,
    netDebt: Number,
    link: String,
    finalLink: String,
  },
  { timestamps: true }
);

balanceSheetSchema.index({ date: 1, symbol: 1 }, { unique: true });

const BalanceSheet = mongoose.model("BalanceSheet", balanceSheetSchema);

export default BalanceSheet;
