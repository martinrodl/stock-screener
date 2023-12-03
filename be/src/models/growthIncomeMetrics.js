import mongoose from "mongoose";

const incomeGrowthSchema = new mongoose.Schema(
  {
    date: String,
    calendarYear: String,
    period: String,
    growthRevenue: Number,
    growthCostOfRevenue: Number,
    growthGrossProfit: Number,
    growthGrossProfitRatio: Number,
    growthResearchAndDevelopmentExpenses: Number,
    growthGeneralAndAdministrativeExpenses: Number,
    growthSellingAndMarketingExpenses: Number,
    growthOtherExpenses: Number,
    growthOperatingExpenses: Number,
    growthCostAndExpenses: Number,
    growthInterestExpense: Number,
    growthDepreciationAndAmortization: Number,
    growthEBITDA: Number,
    growthEBITDARatio: Number,
    growthOperatingIncome: Number,
    growthOperatingIncomeRatio: Number,
    growthTotalOtherIncomeExpensesNet: Number,
    growthIncomeBeforeTax: Number,
    growthIncomeBeforeTaxRatio: Number,
    growthIncomeTaxExpense: Number,
    growthNetIncome: Number,
    growthNetIncomeRatio: Number,
    growthEPS: Number,
    growthEPSDiluted: Number,
    growthWeightedAverageShsOut: Number,
    growthWeightedAverageShsOutDil: Number,
  },
  { timestamps: true }
);

// incomeGrowthSchema.index({ date: 1, symbol: 1 }, { unique: true });

const ProfitGrowth = mongoose.model("IncomeGrowth", incomeGrowthSchema);

export default ProfitGrowth;
