const getIsConsistentGrowth = (annualGrowthRates, property, requstedGrowth) =>
  annualGrowthRates.every(
    (stockGrowth) => stockGrowth[property] >= requstedGrowth
  );

const getDividendYield = (dividendsPaid, marketCap) =>
  (dividendsPaid / marketCap) * 100; // Dividend Yield in percentage
const getBuybackYield = (commonStockRepurchased, marketCap) =>
  (commonStockRepurchased / marketCap) * 100; // Buyback Yield in percentage
