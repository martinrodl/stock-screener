import Stock from '../models/stockModel.js'
import { addCondition } from '../helpers/helperCondition.js'

export const filterStocks = async (req, res) => {
    try {
        const {
            marketCapMin,
            marketCapMax,
            peRatioMin,
            peRatioMax,
            dividendYieldMin,
            dividendYieldMax,
            roicMin,
            roicMax,
            roeMin,
            roeMax,
            debtToEquityMin,
            debtToEquityMax,
            interestCoverageMin,
            interestCoverageMax,
            profitGrowthMin,
            revenueGrowthMin,
            positiveOperatingCashFlowYears,
            positiveFreeCashFlowYears,
            positiveDividendGrowthYears,
            priceToIntrinsicValueRatioMax,
            priceToDiscountedCashFlowRatioMax,
            numberYears = 3,
            limit = 100, // Default limit
            skip = 0, // Default offset
        } = req.body

        const andConditions = []

        addCondition(andConditions, 'values.peRatio', peRatioMin, peRatioMax)
        addCondition(andConditions, 'values.marketCap', marketCapMin, marketCapMax)
        addCondition(andConditions, 'keyMetrics.dividendYield', dividendYieldMin, dividendYieldMax)
        addCondition(andConditions, 'keyMetrics.roic', roicMin, roicMax)
        addCondition(andConditions, 'keyMetrics.roe', roeMin, roeMax)
        addCondition(andConditions, 'keyMetrics.debtToEquity', debtToEquityMin, debtToEquityMax)
        addCondition(
            andConditions,
            'keyMetrics.interestCoverage',
            interestCoverageMin,
            interestCoverageMax
        )

        let aggregationPipeline = [
            { $unwind: { path: '$keyMetrics', preserveNullAndEmptyArrays: true } },
            { $sort: { 'keyMetrics.date': -1 } },
            {
                $group: {
                    _id: '$_id',
                    doc: { $first: '$$ROOT' },
                    latestKeyMetric: { $first: '$keyMetrics' },
                },
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: ['$doc', { keyMetrics: '$latestKeyMetric' }] },
                },
            },
            {
                $match: andConditions.length > 0 ? { $and: andConditions } : {},
            },

            {
                $sort: {
                    symbol: 1, // Sort by symbol in ascending order
                },
            },
        ]
        let stocks = await Stock.aggregate(aggregationPipeline).allowDiskUse(true)
        console.log('stocks', stocks.length)

        let filteredStocks = stocks
            .filter((stock) => {
                let isEligible = true

                // Check for revenue growth minimum
                if (revenueGrowthMin) {
                    isEligible =
                        isEligible &&
                        stock.growthIncomeMetrics
                            ?.slice(-numberYears)
                            .every((year) => year.growthRevenue >= revenueGrowthMin)
                }

                // Check for positive operating cash flow
                if (positiveOperatingCashFlowYears) {
                    isEligible =
                        isEligible &&
                        stock.cashflowStatement
                            ?.slice(-numberYears)
                            .filter((year) => year.operatingCashFlow > 0).length >=
                            positiveOperatingCashFlowYears
                }

                // Check for positive free cash flow
                if (positiveFreeCashFlowYears) {
                    isEligible =
                        isEligible &&
                        stock.cashflowStatement
                            ?.slice(-numberYears)
                            .filter((year) => year.freeCashFlow > 0).length >=
                            positiveFreeCashFlowYears
                }

                // Check for profit growth minimum
                if (profitGrowthMin) {
                    isEligible =
                        isEligible &&
                        stock.growthProfitMetrics
                            ?.slice(-numberYears)
                            .every((year) => year.growthNetIncome >= profitGrowthMin)
                }

                // Check for positive dividend growth
                if (positiveDividendGrowthYears) {
                    isEligible =
                        isEligible &&
                        stock.cashflowStatement
                            ?.slice(-numberYears)
                            .filter((year) => year.dividendsPaid < year.previousYearDividendsPaid)
                            .length >= positiveDividendGrowthYears
                }

                if (priceToIntrinsicValueRatioMax && stock.values.intrinsicValue) {
                    const priceToIntrinsicValueRatio =
                        stock.values.price / stock.values.intrinsicValue
                    isEligible =
                        isEligible && priceToIntrinsicValueRatio <= priceToIntrinsicValueRatioMax
                }

                // Calculate and check price to discounted cash flow ratio
                if (priceToDiscountedCashFlowRatioMax && stock.values.dcf) {
                    const priceToDcfRatio = stock.values.price / stock.values.dcf
                    isEligible = isEligible && priceToDcfRatio <= priceToDiscountedCashFlowRatioMax
                }

                return isEligible
            })
            .slice(skip, skip + limit)
            .map((stock) => ({
                symbol: stock.symbol,
                name: stock.name,
                marketCap: stock.values.marketCap,
                peRatio: stock.values.peRatio,
                earningsDate: stock.values.earningsDate,
                yearReturn: stock.values.yearReturn,
            }))

        res.json(filteredStocks)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}

export const simpleFilterStocks = async (req, res) => {
    try {
        const {
            marketCapMin,
            peRatioMin,
            peRatioMax,
            roicMin,
            roic10yMin,
            roeMin,
            roe10yMin,
            intrinsicValueZeroGrowthMin,
            intrinsicValueAverageGrowthMin,
            intrinsicValueLastYearGrowthMin,
            averageProfitGrowthMin,
            averageDividendGrowthMin,
            averageNetIncomeGrowthMin,
            averageProfitMarginMin,
            profitMarginMin,
            dividendYieldMin,
            dividendYield10yMin,
            debtToAssetsMax,
            debtToEquityMax,
            netDebtToEBITDAMax,
            yearReturnMin,
            limit = 100, // Default limit
            skip = 0, // Default offset
        } = req.body

        const stockPromise = Stock.find({}).select('symbol name values')

        if (marketCapMin) {
            stockPromise.where('values.marketCap').gte(marketCapMin)
        }

        if (peRatioMin) {
            stockPromise.where('values.peRatio').gte(peRatioMin)
        }
        if (peRatioMax) {
            stockPromise.where('values.peRatio').lte(peRatioMax)
        }
        if (roicMin) {
            stockPromise.where('keyMetrics.roic').gte(roicMin)
        }
        if (roic10yMin) {
            stockPromise.where('keyMetrics.roic10y').gte(roic10yMin)
        }
        if (roeMin) {
            stockPromise.where('keyMetrics.roe').gte(roeMin)
        }
        if (roe10yMin) {
            stockPromise.where('keyMetrics.roe10y').gte(roe10yMin)
        }
        if (intrinsicValueZeroGrowthMin) {
            stockPromise.where('values.intrinsicValueZeroGrowth').gte(intrinsicValueZeroGrowthMin)
        }
        if (intrinsicValueAverageGrowthMin) {
            stockPromise
                .where('values.intrinsicValueAverageGrowth')
                .gte(intrinsicValueAverageGrowthMin)
        }
        if (intrinsicValueLastYearGrowthMin) {
            stockPromise
                .where('values.intrinsicValueLastYearGrowth')
                .gte(intrinsicValueLastYearGrowthMin)
        }
        if (averageProfitGrowthMin) {
            stockPromise.where('values.averageProfitGrowth').gte(averageProfitGrowthMin)
        }
        if (averageDividendGrowthMin) {
            stockPromise.where('values.averageDividendGrowth').gte(averageDividendGrowthMin)
        }
        if (averageNetIncomeGrowthMin) {
            stockPromise.where('values.averageNetIncomeGrowth').gte(averageNetIncomeGrowthMin)
        }
        if (averageProfitMarginMin) {
            stockPromise.where('values.averageProfitMargin').gte(averageProfitMarginMin)
        }
        if (profitMarginMin) {
            stockPromise.where('values.profitMargin').gte(profitMarginMin)
        }
        if (dividendYieldMin) {
            stockPromise.where('keyMetrics.dividendYield').gte(dividendYieldMin)
        }
        if (dividendYield10yMin) {
            stockPromise.where('keyMetrics.dividendYield10y').gte(dividendYield10yMin)
        }
        if (debtToAssetsMax) {
            stockPromise.where('keyMetrics.debtToAssets').lte(debtToAssetsMax)
        }
        if (debtToEquityMax) {
            stockPromise.where('keyMetrics.debtToEquity').lte(debtToEquityMax)
        }
        if (netDebtToEBITDAMax) {
            stockPromise.where('keyMetrics.netDebtToEBITDA').lte(netDebtToEBITDAMax)
        }
        if (yearReturnMin) {
            stockPromise.where('values.yearReturn').gte(yearReturnMin)
        }

        const stocks = await stockPromise.skip(skip).limit(limit)

        const filteredStocks = stocks.map((stock) => ({
            symbol: stock.symbol,
            name: stock.name,
            marketCap: stock.values.marketCap,
            peRatio: stock.values.peRatio,
            earningsDate: stock.values.earningsDate,
            yearReturn: stock.values.yearReturn,
        }))

        res.json(filteredStocks)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}
