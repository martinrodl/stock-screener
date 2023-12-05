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
            solvencyMin,
            solvencyMax,
            debtToEquityMin,
            debtToEquityMax,
            interestCoverageMin,
            interestCoverageMax,
            profitGrowthMin,
            revenueGrowthMin,
            positiveOperatingCashFlowYears,
            positiveFreeCashFlowYears,
            positiveDividendGrowthYears,
            numberYears = 3,
            limit = 100, // Default limit
            skip = 0, // Default offset
        } = req.body

        const andConditions = []

        addCondition(andConditions, 'peRatio', peRatioMin, peRatioMax)
        addCondition(andConditions, 'marketCap', marketCapMin, marketCapMax)
        addCondition(andConditions, 'keyMetrics.dividendYield', dividendYieldMin, dividendYieldMax)
        addCondition(andConditions, 'keyMetrics.roic', roicMin, roicMax)
        addCondition(andConditions, 'keyMetrics.roe', roeMin, roeMax)
        addCondition(andConditions, 'keyMetrics.solvencyRatio', solvencyMin, solvencyMax)
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

        let filteredStocks = stocks
            .filter((stock) => {
                let isEligible = true

                // Check for revenue growth minimum
                if (revenueGrowthMin) {
                    isEligible =
                        isEligible &&
                        stock.growthIncomeMetrics
                            .slice(-numberYears)
                            .every((year) => year.growthRevenue >= revenueGrowthMin)
                }

                // Check for positive operating cash flow
                if (positiveOperatingCashFlowYears) {
                    isEligible =
                        isEligible &&
                        stock.cashflowStatement
                            .slice(-numberYears)
                            .filter((year) => year.operatingCashFlow > 0).length >=
                            positiveOperatingCashFlowYears
                }

                // Check for positive free cash flow
                if (positiveFreeCashFlowYears) {
                    isEligible =
                        isEligible &&
                        stock.cashflowStatement
                            .slice(-numberYears)
                            .filter((year) => year.freeCashFlow > 0).length >=
                            positiveFreeCashFlowYears
                }

                // Check for profit growth minimum
                if (profitGrowthMin) {
                    isEligible =
                        isEligible &&
                        stock.growthProfitMetrics
                            .slice(-numberYears)
                            .every((year) => year.growthNetIncome >= profitGrowthMin)
                }

                // Check for positive dividend growth
                if (positiveDividendGrowthYears) {
                    isEligible =
                        isEligible &&
                        stock.cashflowStatement
                            .slice(-numberYears)
                            .filter((year) => year.dividendsPaid < year.previousYearDividendsPaid)
                            .length >= positiveDividendGrowthYears
                }

                return isEligible
            })
            .slice(skip, skip + limit)

        res.json(filteredStocks)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}
