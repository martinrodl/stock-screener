export type StockCriteria = {
    marketCapMin?: string
    marketCapMax?: string
    peRatioMin?: string
    peRatioMax?: string
    dividendYieldMin?: string
    dividendYieldMax?: string
    roicMin?: string
    roicMax?: string
    roeMin?: string
    roeMax?: string
    debtToEquityMin?: string
    debtToEquityMax?: string
    interestCoverageMin?: string
    interestCoverageMax?: string
    priceToIntrinsicValueRatioMax?: string
    priceToDiscountedCashFlowRatioMax?: string
    profitGrowthMin?: string
    revenueGrowthMin?: string
    positiveProfitYears?: string
    positiveOperatingCashFlowYears?: string
    positiveFreeCashFlowYears?: string
    positiveDividendGrowthYears?: string
    numberYears?: string
}

export type SimpleStockCriteria = {
    marketCapMin?: string
    peRatioMin?: string
    peRatioMax?: string
    roicMin?: string
    roic10yMin?: string
    roeMin?: string
    roe10yMin?: string
    IntrinsicRatioZeroMin?: string
    IntrinsicRatioAverageMin?: string
    IntrinsicRatioLastYearMin?: string
    averageProfitGrowthMin?: string
    averageDividendGrowthMin?: string
    averageNetIncomeGrowthMin?: string
    averageProfitMarginMin?: string
    profitMarginMin?: string
    dividendYieldMin?: string
    dividendYield10yMin?: string
    debtToAssetsMax?: string
    debtToEquityMax?: string
    netDebtToEBITDAMax?: string
    yearReturnMin?: string
}
