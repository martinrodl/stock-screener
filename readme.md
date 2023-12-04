### Ideas

Short, quickbuy - huge PE, huge drop value not based on value
My portfolio - my shares to click to detail
Long term recommendation - screen under valued stocks with long term profit
Grahams rules screener - screener according grahams book

### Parameters

-   Blue chip - market cap > 10B
-   5,10 years positive profite
-   P/E under 15
-   30 - 70% dividend of revenue
-   Dividend yield or dividend buyback above 4%
-   ROIC & ROE > 10%
-   Solvency & debt to equity < 2
-   Interest coverage ration > 3

gross profit margin ?

`growthNetIncome`

commonStockRepurchased

```javascript
      if (stockData.pe < 15 &&
          stockData.mktCap > 10000000000 &&
          /* Check 5 years consecutive profit growth > 10% */ &&
          (stockData.dividendYield > 4 || /* Check Dividend Buyback > 4% */ ) &&
          stockData.roic > 10 &&
          stockData.roe > 10 &&
          stockData.debtToEquity < 2 &&
          stockData.interestCoverage > 3) {
            await Stock.findOneAndUpdate({ symbol: stock.symbol }, stockData, { upsert: true });
      }
```
