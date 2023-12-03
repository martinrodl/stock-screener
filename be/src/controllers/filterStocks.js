import Stock from "../models/stockModel.js";

export const filterStocks = async (req, res) => {
  try {
    const {
      marketCapMin,
      peRatioMax,
      dividendYieldMin,
      roicMin,
      roeMin,
      solvencyMax,
      debtToEquityMax,
      interestCoverageMin,
      positiveProfitYears,
      dividendRevenueRatioRange,
      limit = 1000, // Default limit
      offset = 0, // Default offset
    } = req.body;

    let query = {
      ...(marketCapMin && { "keyMetrics.marketCap": { $gt: marketCapMin } }),
      ...(peRatioMax && { peRatio: { $lt: peRatioMax } }),
      ...(dividendYieldMin && {
        $or: [
          { "keyMetrics.dividendYield": { $gt: dividendYieldMin } },
          { "keyMetrics.dividendBuybackRate": { $gt: dividendYieldMin } },
        ],
      }),
      ...(roicMin && { "keyMetrics.roic": { $gt: roicMin } }),
      ...(roeMin && { "keyMetrics.roe": { $gt: roeMin } }),
      ...(solvencyMax && { "keyMetrics.solvencyRatio": { $lt: solvencyMax } }),
      ...(debtToEquityMax && {
        "keyMetrics.debtToEquity": { $lt: debtToEquityMax },
      }),
      ...(interestCoverageMin && {
        "keyMetrics.interestCoverage": { $gt: interestCoverageMin },
      }),
    };

    let stocks = await Stock.find(
      query,
      "symbol name exchange peRatio price marketCap"
    )
      .skip(offset)
      .limit(limit);

    // Filtering with additional conditions
    let filteredStocks = [];
    for (const stock of stocks) {
      const isProfitConsistent = positiveProfitYears
        ? stock.incomeStatements
            .slice(-positiveProfitYears)
            .every((year) => year.netIncome > 0)
        : true;

      const isDividendRatioInRange = dividendRevenueRatioRange
        ? stock.incomeStatements.some((year) => {
            const dividendRatio = year.dividendsPaid / year.revenue;
            return (
              dividendRatio >= dividendRevenueRatioRange.min &&
              dividendRatio <= dividendRevenueRatioRange.max
            );
          })
        : true;

      if (isProfitConsistent && isDividendRatioInRange) {
        filteredStocks.push(stock);
      }
    }

    res.json(filteredStocks); // Send the filtered stocks as a response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send(error.message);
  }
};
