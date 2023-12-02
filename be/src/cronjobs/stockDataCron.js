import Stock from "../models/stockModel";
import axios from "axios";
import cron from "node-cron";

import {
  saveStockList,
  updateAllStocksSubdocuments,
} from "../utils/stockUtils.js";

// Scheduled to run once every day
cron.schedule("0 0 * * *", saveStockList);

// Scheduled to run two times per month
cron.schedule("0 0 1,15 * *", updateAllStocksSubdocuments);
