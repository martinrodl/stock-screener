import mongoose from "mongoose";

const incomeStatementSchema = new mongoose.Schema(
  {
    date: String,
    reportedCurrency: String,
    cik: String,
    fillingDate: Date,
    acceptedDate: Date,
    calendarYear: String,
    period: String,
    revenue: Number,
    costOfRevenue: Number,
    grossProfit: Number,
    grossProfitRatio: Number,
    researchAndDevelopmentExpenses: Number,
    generalAndAdministrativeExpenses: Number,
    sellingAndMarketingExpenses: Number,
    sellingGeneralAndAdministrativeExpenses: Number,
    otherExpenses: Number,
    operatingExpenses: Number,
    costAndExpenses: Number,
    interestIncome: Number,
    interestExpense: Number,
    depreciationAndAmortization: Number,
    ebitda: Number,
    ebitdaratio: Number,
    operatingIncome: Number,
    operatingIncomeRatio: Number,
    totalOtherIncomeExpensesNet: Number,
    incomeBeforeTax: Number,
    incomeBeforeTaxRatio: Number,
    incomeTaxExpense: Number,
    netIncome: Number,
    netIncomeRatio: Number,
    eps: Number,
    epsdiluted: Number,
    weightedAverageShsOut: Number,
    weightedAverageShsOutDil: Number,
    link: String,
    finalLink: String,
  },
  { timestamps: true }
);

// incomeStatementSchema.index({ date: 1, symbol: 1 }, { unique: true });

const IncomeStatement = mongoose.model(
  "IncomeStatement",
  incomeStatementSchema
);
export default IncomeStatement;
