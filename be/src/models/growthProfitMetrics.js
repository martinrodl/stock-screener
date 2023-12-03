import mongoose from "mongoose";

const profitGrowthSchema = new mongoose.Schema(
  {
    date: String,
    calendarYear: String,
    period: String,
    growthNetIncome: Number,
    growthDepreciationAndAmortization: Number,
    growthDeferredIncomeTax: Number,
    growthStockBasedCompensation: Number,
    growthChangeInWorkingCapital: Number,
    growthAccountsReceivables: Number,
    growthInventory: Number,
    growthAccountsPayables: Number,
    growthOtherWorkingCapital: Number,
    growthOtherNonCashItems: Number,
    growthNetCashProvidedByOperatingActivites: Number,
    growthInvestmentsInPropertyPlantAndEquipment: Number,
    growthAcquisitionsNet: Number,
    growthPurchasesOfInvestments: Number,
    growthSalesMaturitiesOfInvestments: Number,
    growthOtherInvestingActivites: Number,
    growthNetCashUsedForInvestingActivites: Number,
    growthDebtRepayment: Number,
    growthCommonStockIssued: Number,
    growthCommonStockRepurchased: Number,
    growthDividendsPaid: Number,
    growthOtherFinancingActivites: Number,
    growthNetCashUsedProvidedByFinancingActivities: Number,
    growthEffectOfForexChangesOnCash: Number,
    growthNetChangeInCash: Number,
    growthCashAtEndOfPeriod: Number,
    growthCashAtBeginningOfPeriod: Number,
    growthOperatingCashFlow: Number,
    growthCapitalExpenditure: Number,
    growthFreeCashFlow: Number,
  },
  { timestamps: true }
);

// profitGrowthSchema.index({ symbol: 1, date: 1 }, { unique: true });

const ProfitGrowth = mongoose.model("ProfitGrowth", profitGrowthSchema);

export default ProfitGrowth;
