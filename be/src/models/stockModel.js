import mongoose from "mongoose";

import KeyMetrics from "./keyMetrics.js";
import growthProfitMetrics from "./growthProfitMetrics.js";
import growthIncomeMetrics from "./growthIncomeMetrics.js";
import balanceSheetStatement from "./balanceSheet.js";
import incomeStatement from "./incomeStatement.js";
import cashflowStatement from "./cashflowStatement.js";

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  exchange: String,
  peRatio: {
    type: Number,
    default: null,
  },
  price: Number,
  marketCap: Number,
  lastUpdateAt: {
    type: Date,
    default: Date.now,
  },
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
  incomeStatements: { type: [incomeStatement.schema], required: true },
  cashflowStatements: { type: [cashflowStatement.schema], required: true },
});

stockSchema.pre("save", function (next) {
  this.lastUpdateAt = Date.now();
  next();
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
