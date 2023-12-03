import cron from "node-cron";

import {
  saveStockList,
  updateAllStocksSubdocuments,
} from "../utils/stockUtils.js";

// Scheduled to run once every day
cron.schedule("0 0 * * *", () => {
  saveStockList("NASDAQ");
});
cron.schedule("0 6 * * *", () => {
  saveStockList("NYSE");
});
cron.schedule("0 12 * * *", () => {
  saveStockList("AMEX");
});

// Scheduled to run two times per month
cron.schedule("0 0 1,15 * *", updateAllStocksSubdocuments);
