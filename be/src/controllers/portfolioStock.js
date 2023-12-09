import Stock from '../models/stockModel.js'

export async function getPortfolioStocks(req, res) {
    const { symbols } = req.body
    if (!Array.isArray(symbols)) {
        return res.status(400).send('Invalid input: expected an array of symbols')
    }

    const stocks = await Stock.find({ symbol: { $in: symbols } })
    res.send(stocks)
}
