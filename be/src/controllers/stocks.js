import Stock from '../models/stockModel.js'

export const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find({}, 'symbol name exchange peRatio price marketCap')
        res.json(stocks)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getStock = async (req, res) => {
    try {
        const { symbol } = req.query
        const stock = await Stock.findOne({ symbol })
        res.json(stock)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getStockSureData = async (req, res) => {
    try {
        const { symbol } = req.query
        const stock = await Stock.findOne({ symbol })
        console.log(stock)
        if (!stock) {
            res.json({ error: 'Stock not found' })
        } else {
            res.json(stock.sureData)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
