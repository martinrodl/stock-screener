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
            IntrinsicRatioZeroMin,
            IntrinsicRatioAverageMin,
            IntrinsicRatioLastYearMin,
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

        let matchConditions = {}
        console.log('IntrinsicRatioZeroMin ', IntrinsicRatioZeroMin)
        console.log('IntrinsicRatioAverageMin ', IntrinsicRatioAverageMin)

        if (marketCapMin) {
            matchConditions['values.marketCap'] = { $gte: parseFloat(marketCapMin) }
        }
        if (peRatioMin || peRatioMax) {
            matchConditions['values.peRatio'] = {}
            if (peRatioMin) {
                matchConditions['values.peRatio'].$gte = parseFloat(peRatioMin)
            }
            if (peRatioMax) {
                matchConditions['values.peRatio'].$lte = parseFloat(peRatioMax)
            }
        }
        if (roicMin) {
            matchConditions['keyMetrics.roic'] = { $gte: parseFloat(roicMin) }
        }
        if (roic10yMin) {
            matchConditions['keyMetrics.roic10y'] = { $gte: parseFloat(roic10yMin) }
        }
        if (roeMin) {
            matchConditions['keyMetrics.roe'] = { $gte: parseFloat(roeMin) }
        }
        if (roe10yMin) {
            matchConditions['keyMetrics.roe10y'] = { $gte: parseFloat(roe10yMin) }
        }
        if (averageProfitGrowthMin) {
            matchConditions['values.averageProfitGrowth'] = {
                $gte: parseFloat(averageProfitGrowthMin),
            }
        }
        if (averageDividendGrowthMin) {
            matchConditions['values.averageDividendGrowth'] = {
                $gte: parseFloat(averageDividendGrowthMin),
            }
        }
        if (averageNetIncomeGrowthMin) {
            matchConditions['values.averageNetIncomeGrowth'] = {
                $gte: parseFloat(averageNetIncomeGrowthMin),
            }
        }
        if (averageProfitMarginMin) {
            matchConditions['values.averageProfitMargin'] = {
                $gte: parseFloat(averageProfitMarginMin),
            }
        }
        if (profitMarginMin) {
            matchConditions['values.profitMargin'] = { $gte: parseFloat(profitMarginMin) }
        }
        if (dividendYieldMin) {
            matchConditions['keyMetrics.dividendYield'] = { $gte: parseFloat(dividendYieldMin) }
        }
        if (dividendYield10yMin) {
            matchConditions['keyMetrics.dividendYield10y'] = {
                $gte: parseFloat(dividendYield10yMin),
            }
        }
        if (debtToAssetsMax) {
            matchConditions['keyMetrics.debtToAssets'] = { $lte: parseFloat(debtToAssetsMax) }
        }
        if (debtToEquityMax) {
            matchConditions['keyMetrics.debtToEquity'] = { $lte: parseFloat(debtToEquityMax) }
        }
        if (netDebtToEBITDAMax) {
            matchConditions['keyMetrics.netDebtToEBITDA'] = { $lte: parseFloat(netDebtToEBITDAMax) }
        }
        if (yearReturnMin) {
            matchConditions['values.yearReturn'] = { $gte: parseFloat(yearReturnMin) }
        }

        let aggregationPipeline = []

        if (IntrinsicRatioZeroMin) {
            aggregationPipeline.push({
                $addFields: {
                    intrinsicRatioZero: {
                        $divide: ['$values.intrinsicValueZeroGrowth', '$values.price'],
                    },
                },
            })
            matchConditions['intrinsicRatioZero'] = { $gte: 1 / parseFloat(IntrinsicRatioZeroMin) }
        }
        if (IntrinsicRatioAverageMin) {
            aggregationPipeline.push({
                $addFields: {
                    intrinsicRatioAverage: {
                        $divide: ['$values.intrinsicValueAverageGrowth', '$values.price'],
                    },
                },
            })
            matchConditions['intrinsicRatioAverage'] = {
                $gte: 1 / parseFloat(IntrinsicRatioAverageMin),
            }
        }
        if (IntrinsicRatioLastYearMin) {
            aggregationPipeline.push({
                $addFields: {
                    intrinsicRatioLastYear: {
                        $divide: ['$values.intrinsicValueLastYearGrowth', '$values.price'],
                    },
                },
            })
            matchConditions['intrinsicRatioLastYear'] = {
                $gte: 1 / parseFloat(IntrinsicRatioLastYearMin),
            }
        }

        aggregationPipeline.push({ $match: matchConditions })

        const stocks = await Stock.aggregate(aggregationPipeline).skip(skip).limit(limit)
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
