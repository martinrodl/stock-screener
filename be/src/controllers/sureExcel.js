import xlsx from 'xlsx'
import Stock from '../models/stockModel.js'

export const updateExcel = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded')
    }
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const data = xlsx.utils.sheet_to_json(worksheet)

        for (const item of data) {
            const symbol = item.Ticker // Adjust according to your Excel file structure

            const stock = await Stock.findOne({ symbol })
            if (!stock) {
                // console.error(`Stock ${symbol} not found`)
                continue
            }
            console.log('symbol ', symbol)

            const stockAnalysisData = {
                Rating: item.Rating,
                PriceAtTimeOfRating: item['Price at time of rating'],
                StockPrice: item['Stock Price'],
                FairValuePrice: item['Fair Value Price'],
                PercentFairValue: item['Percent Fair Value'],
                DividendYield: item['Dividend Yield'],
                ValuationReturn: item['Valuation Return'],
                GrowthReturn: item['Growth Return'],
                ExpectedTotalReturn: item['Expected Total Return'],
                DividendRiskScore: item['Dividend Risk Score'],
                RetirementSuitabilityScore: item['Retirement Suitability Score'],
                PERatio: item.PERatio,
                ForwardEPSEstimate: item['Forward EPS Estimate'],
                AnnualDividendPayments: item['Annual Dividend Payments'],
                PayoutRatio: item['Payout Ratio'],
                YearsOfDividendGrowth: item['Years of Dividend Growth'],
                DividendGrowthRate: item['Dividend Growth Rate'],
                ExDividendDate: item['Ex-Dividend Date'],
                Trailing1YearTotalReturn: item['Trailing 1 Year Total Return'],
                SecurityType: item['Security Type'],
                International: item.International === 'Yes',
                Sector: item.Sector,
                MarketCap: item['Market Cap'],
                LastReportUpload: item['Last Report Upload'],
                Analyst: item.Analyst,
            }

            stock.sureData = stockAnalysisData
            await stock.save()
        }

        res.status(200).send('Stock data updated successfully')
    } catch (error) {
        console.error('Error updating stock data:', error)
        res.status(500).send('Error updating stock data')
    }
}
