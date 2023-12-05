import React from 'react'

const CriteriaList = () => {
    const criteria = [
        {
            name: 'Market Capitalization (marketCap)',
            description:
                "The total market value of a company's outstanding shares, usually expressed in currency (e.g., USD).",
        },
        {
            name: 'Price-to-Earnings Ratio (peRatio)',
            description:
                "Measures a company's current share price relative to its per-share earnings, expressed as a number.",
        },
        {
            name: 'Dividend Yield (dividendYield)',
            description:
                "The ratio of a company's annual dividend payments to its share price, indicating the dividend return relative to the stock price, expressed as a percentage.",
        },
        {
            name: 'Return on Invested Capital (roic)',
            description:
                'Measures how well a company generates profits from its total capital, expressed as a percentage.',
        },
        {
            name: 'Return on Equity (roe)',
            description:
                "The amount of net income returned as a percentage of shareholders equity, reflecting a company's ability to use investments to generate earnings.",
        },
        {
            name: 'Solvency Ratio (solvency)',
            description:
                'Assesses a company’s ability to meet its long-term debts and obligations, expressed as a percentage of its after-tax income to its total debt obligations.',
        },
        {
            name: 'Debt-to-Equity Ratio (debtToEquity)',
            description:
                "Indicates the relative proportion of shareholders' equity and debt used to finance a company's assets, expressed as a ratio.",
        },
        {
            name: 'Interest Coverage Ratio (interestCoverage)',
            description:
                "A measure of a company's ability to meet its interest payments, calculated by dividing earnings before interest and taxes (EBIT) by interest expenses.",
        },
        {
            name: 'Dividend Revenue Ratio (dividendRevenueRatio)',
            description:
                "The percentage of a company's revenue that is paid out as dividends, indicating how much revenue is being distributed to shareholders, expressed as a percentage.",
        },
        {
            name: 'Profit Growth (profitGrowth)',
            description:
                'Indicates the year-over-year growth in a company’s profit, reflecting the percentage increase in profit over a specific period.',
        },
        {
            name: 'Positive Operating Cash Flow Years (positiveOperatingCashFlowYears)',
            description:
                'Counts the number of years a company has generated positive cash flow from operating activities, indicating consistent operational profitability.',
        },
        {
            name: 'Positive Free Cash Flow Years (positiveFreeCashFlowYears)',
            description:
                'The number of years a company has generated positive free cash flow, which is the cash remaining after all operating expenses and capital expenditures are paid.',
        },
        {
            name: 'Positive Dividend Growth Years (positiveDividendGrowthYears)',
            description:
                'Counts the number of consecutive years a company has not only paid dividends but also increased them, indicating financial health and stability.',
        },
    ]

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Stock Screener Criteria</h2>
            <ul className="list-disc list-inside">
                {criteria.map((item, index) => (
                    <li key={index} className="mb-2">
                        <span className="font-bold">{item.name}: </span>
                        <span>{item.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CriteriaList
