import mongoose from "mongoose";

const cashFlowStatementSchema = new mongoose.Schema(
  {
    date: String,
    reportedCurrency: String,
    cik: String,
    fillingDate: Date,
    acceptedDate: Date,
    calendarYear: String,
    period: String,
    netIncome: Number,
    depreciationAndAmortization: Number,
    deferredIncomeTax: Number,
    stockBasedCompensation: Number,
    changeInWorkingCapital: Number,
    accountsReceivables: Number,
    inventory: Number,
    accountsPayables: Number,
    otherWorkingCapital: Number,
    otherNonCashItems: Number,
    netCashProvidedByOperatingActivities: Number,
    investmentsInPropertyPlantAndEquipment: Number,
    acquisitionsNet: Number,
    purchasesOfInvestments: Number,
    salesMaturitiesOfInvestments: Number,
    otherInvestingActivites: Number,
    netCashUsedForInvestingActivites: Number,
    debtRepayment: Number,
    commonStockIssued: Number,
    commonStockRepurchased: Number,
    dividendsPaid: Number,
    otherFinancingActivites: Number,
    netCashUsedProvidedByFinancingActivities: Number,
    effectOfForexChangesOnCash: Number,
    netChangeInCash: Number,
    cashAtEndOfPeriod: Number,
    cashAtBeginningOfPeriod: Number,
    operatingCashFlow: Number,
    capitalExpenditure: Number,
    freeCashFlow: Number,
    link: String,
    finalLink: String,
  },
  { timestamps: true }
);

// cashFlowStatementSchema.index({ date: 1, symbol: 1 }, { unique: true });

const CashFlowStatement = mongoose.model(
  "CashFlowStatement",
  cashFlowStatementSchema
);
export default CashFlowStatement;
