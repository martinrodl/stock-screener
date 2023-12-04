import Stock from '../models/stockModel.js'

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
            offset = 0, // Default offset
        } = req.body

        let aggregationPipeline = [
            {
                $match: {
                    $and: [
                        { peRatio: { $gte: 0 } },
                        ...(peRatioMin !== undefined
                            ? [{ peRatio: { $gte: parseFloat(peRatioMin) } }]
                            : []),
                        ...(peRatioMax !== undefined
                            ? [{ peRatio: { $lte: parseFloat(peRatioMax) } }]
                            : []),
                        ...(marketCapMin
                            ? [{ marketCap: { $gte: parseFloat(marketCapMin) } }]
                            : []),
                        ...(marketCapMax
                            ? [{ marketCap: { $lte: parseFloat(marketCapMax) } }]
                            : []),
                        // ... other conditions
                    ],
                },
            },
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
                // Additional match for fields within the latest keyMetrics entry
                $match: {
                    ...(dividendYieldMin && {
                        'keyMetrics.dividendYield': { $gte: parseFloat(dividendYieldMin) },
                    }),
                    ...(dividendYieldMax && {
                        'keyMetrics.dividendYield': { $lte: parseFloat(dividendYieldMax) },
                    }),
                    ...(roicMin && { 'keyMetrics.roic': { $gte: parseFloat(roicMin) } }),
                    ...(roicMax && { 'keyMetrics.roic': { $lte: parseFloat(roicMax) } }),
                    ...(roeMin && { 'keyMetrics.roe': { $gte: parseFloat(roeMin) } }),
                    ...(roeMax && { 'keyMetrics.roe': { $lte: parseFloat(roeMax) } }),
                    ...(solvencyMin && {
                        'keyMetrics.solvencyRatio': { $gte: parseFloat(solvencyMin) },
                    }),
                    ...(solvencyMax && {
                        'keyMetrics.solvencyRatio': { $lte: parseFloat(solvencyMax) },
                    }),
                    ...(debtToEquityMin && {
                        'keyMetrics.debtToEquity': { $gte: parseFloat(debtToEquityMin) },
                    }),
                    ...(debtToEquityMax && {
                        'keyMetrics.debtToEquity': { $lte: parseFloat(debtToEquityMax) },
                    }),
                    ...(interestCoverageMin && {
                        'keyMetrics.interestCoverage': { $gte: parseFloat(interestCoverageMin) },
                    }),
                    ...(interestCoverageMax && {
                        'keyMetrics.interestCoverage': { $lte: parseFloat(interestCoverageMax) },
                    }),

                    // ... add other filters based on the latest keyMetrics entry
                },
            },
        ]

        let stocks = await Stock.aggregate(aggregationPipeline)

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
            .slice(offset, offset + limit)

        res.json(filteredStocks)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}
