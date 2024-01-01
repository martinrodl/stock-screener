import React from 'react'
import moment from 'moment'

import { formatBigNumber } from '../helpers/formatNumber'

interface BasicInfoProps {
    peRatio?: number
    marketCap?: number
    roic?: number
    roe?: number
    debtToEquity?: number
    dateMetrics?: string
    price?: number
    dcf?: number
    capeRatio?: number
    date?: string
    intrinsicValueZeroGrowth?: number
    intrinsicValueAverageGrowth?: number
    intrinsicValueLastYearGrowth?: number
    peterlynchValue?: number
    sharesOutstanding?: number
    sharesOutstanding5y?: number
    roe10y?: number
    roic10y?: number
    averageProfitGrowth?: number
    averageDividendGrowth?: number
    averageNetIncomeGrowth?: number
    averageProfitMargin?: number
    profitMargin?: number
    eps?: number
    debtPerShare?: number
    dividendYield?: number
    dividendYield10y?: number
    dividendPayoutRatio?: number
    freeCashFlowPerShare?: number
    buybackYield?: number
    buybackPayoutRatio?: number
    debtToAssets?: number
    netDebtToEBITDA?: number
    similarCompanies?: string[]
    averagePESimilarCompanies?: number
    yearReturn?: number
}

const BasicInfoTable: React.FC<BasicInfoProps> = ({
    peRatio,
    marketCap,
    roic,
    roe,
    debtToEquity,
    dateMetrics,
    price,
    dcf,
    date,
    capeRatio,
    intrinsicValueZeroGrowth,
    intrinsicValueAverageGrowth,
    intrinsicValueLastYearGrowth,
    peterlynchValue,
    sharesOutstanding,
    sharesOutstanding5y,
    roe10y,
    roic10y,
    averageProfitGrowth,
    averageDividendGrowth,
    averageNetIncomeGrowth,
    averageProfitMargin,
    profitMargin,
    eps,
    debtPerShare,
    dividendYield,
    dividendYield10y,
    dividendPayoutRatio,
    freeCashFlowPerShare,
    buybackYield,
    buybackPayoutRatio,
    debtToAssets,
    netDebtToEBITDA,
    similarCompanies,
    averagePESimilarCompanies,
    yearReturn,
}) => {
    return (
        <div className="flex justify-center border">
            <div className="flex flex-col space-y-5 p-3 rounded-md min-w-[220px] max-w-lg">
                <div className="flex justify-between border-b py-2">
                    <span>Market Cap:</span>
                    <span>{marketCap ? formatBigNumber(marketCap) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>P/E Ratio:</span>
                    <span>{peRatio ? peRatio.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>CAPE Ratio:</span>
                    <span>{capeRatio ? capeRatio.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Average PE similar companies:</span>
                    <span>
                        {averagePESimilarCompanies ? averagePESimilarCompanies.toFixed(2) : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Similar companies:</span>
                    <span>{similarCompanies ? similarCompanies.join(', ') : 'N/A'}</span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>ROE:</span>
                    <span>{roe ? `${(roe * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>ROE 10y:</span>
                    <span>{roe10y ? `${(roe10y * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>ROIC:</span>
                    <span>{roic ? `${(roic * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>ROIC 10y:</span>
                    <span>{roic10y ? `${(roic10y * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Price:</span>
                    <span>{price ? price.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>EPS:</span>
                    <span>{eps ? eps.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Free cash flow per share:</span>
                    <span>{freeCashFlowPerShare ? freeCashFlowPerShare.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Debt per share:</span>
                    <span>{debtPerShare ? debtPerShare.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Discounted cash flow value:</span>
                    <span>{dcf ? dcf.toFixed(2) : 'N/A'}</span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>Intrinsic value zero growth:</span>
                    <span>
                        {intrinsicValueZeroGrowth ? intrinsicValueZeroGrowth.toFixed(2) : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Intrinsic value average growth:</span>
                    <span>
                        {intrinsicValueAverageGrowth
                            ? intrinsicValueAverageGrowth.toFixed(2)
                            : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Intrinsic value last year growth:</span>
                    <span>
                        {intrinsicValueLastYearGrowth
                            ? intrinsicValueLastYearGrowth.toFixed(2)
                            : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Peter Lynch value:</span>
                    <span>{peterlynchValue ? peterlynchValue.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Shares outstanding:</span>
                    <span>{sharesOutstanding ? formatBigNumber(sharesOutstanding) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Shares outstanding 5y:</span>
                    <span>
                        {sharesOutstanding5y ? formatBigNumber(sharesOutstanding5y) : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Profit margin:</span>
                    <span>{profitMargin ? `${(profitMargin * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Average profit margin:</span>
                    <span>
                        {averageProfitMargin ? `${(averageProfitMargin * 100).toFixed(2)}%` : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Average profit growth:</span>
                    <span>
                        {averageProfitGrowth ? `${(averageProfitGrowth * 100).toFixed(2)}%` : 'N/A'}
                    </span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>Average net income growth:</span>
                    <span>
                        {averageNetIncomeGrowth
                            ? `${(averageNetIncomeGrowth * 100).toFixed(2)}%`
                            : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Average dividend growth:</span>
                    <span>
                        {averageDividendGrowth
                            ? `${(averageDividendGrowth * 100).toFixed(2)}%`
                            : 'N/A'}
                    </span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>Dividend yield:</span>
                    <span>{dividendYield ? `${(dividendYield * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Dividend yield 10y:</span>
                    <span>
                        {dividendYield10y ? `${(dividendYield10y * 100).toFixed(2)}%` : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Dividend payout ratio:</span>
                    <span>
                        {dividendPayoutRatio ? `${(dividendPayoutRatio * 100).toFixed(2)}%` : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Buyback yield:</span>
                    <span>{buybackYield ? `${(buybackYield * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Buyback payout ratio:</span>
                    <span>
                        {buybackPayoutRatio ? `${(buybackPayoutRatio * 100).toFixed(2)}%` : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Debt to Equity:</span>
                    <span>{debtToEquity ? debtToEquity.toFixed(2) : 'N/A'}</span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>Debt to assets:</span>
                    <span>{debtToAssets ? debtToAssets.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Net debt to EBITDA:</span>
                    <span>{netDebtToEBITDA ? netDebtToEBITDA.toFixed(2) : 'N/A'}</span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>Year return:</span>
                    <span>{yearReturn ? `${(yearReturn * 100).toFixed(2)}%` : 'N/A'}</span>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span>Date metrics:</span>
                    <span>{dateMetrics ? dateMetrics : 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span>Date:</span>
                    <span>{date ? moment.unix(date).format('YYYY-MM-DD') : 'N/A'}</span>
                </div>
            </div>
        </div>
    )
}

export default BasicInfoTable
