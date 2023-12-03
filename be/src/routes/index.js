import express from "express";
import { getStatus } from "../controllers/status.js";
import { getAllStocks, getStock } from "../controllers/stocks.js";
import {
  launchSaveStockList,
  launchUpdateKeyMetrics,
  launchUpdateGrowthCashflowMetrics,
  launchUpdateGrowthIncomeMetrics,
  launchUpdateIncomeStatement,
  launchUpdateBalanceSheet,
  launchUpdateCashflowStatement,
  launchUpdateAllStocksSubdocuments,
} from "../controllers/updateStocks.js";

import { filterStocks } from "../controllers/filterStocks.js";

const router = express.Router();

// Status route
router.get("/status", getStatus); // Route to get the status of the server

// Stock routes
router.get("/onestock", getStock); // Route to get all stocks from the database
router.get("/stocks", getAllStocks); // Route to get all stocks from the database

// Update routes
router.post("/launchsavestockslist", launchSaveStockList); // Route to launch the saveStockList function
router.post("/launchupdatekeymetrics", launchUpdateKeyMetrics); // Route to launch the updateKeyMetrics function
router.post(
  "/launchUpdateGrowthCashflowMetrics",
  launchUpdateGrowthCashflowMetrics
); // Route to launch the updateGrowthMetrics function
router.post(
  "/launchupdategrowthincomemetrics",
  launchUpdateGrowthIncomeMetrics
); // Route to launch the updateGrowthIncomeMetrics function

router.post("/launchupdateincomestatement", launchUpdateIncomeStatement); // Route to launch the updateIncomeStatement function
router.post("/launchUpdateBalanceSheet", launchUpdateBalanceSheet); // Route to launch the updateIncomeStatement function
router.post("/launchUpdateCashflowStatement", launchUpdateCashflowStatement); // Route to launch the updateIncomeStatement function
router.post(
  "/launchUpdateAllStocksSubdocuments",
  launchUpdateAllStocksSubdocuments
); // Route to launch the updateIncomeStatement function

// Filter routes
router.post("/filterstocks", filterStocks); // Route to filter stock

export default router;
