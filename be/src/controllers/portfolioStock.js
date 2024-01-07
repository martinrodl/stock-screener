import PortfolioModel from '../models/portfolioData.js'
import Stock from '../models/stockModel.js'

export async function createInitialPortfolio(ticker) {
    try {
        const newPortfolio = new PortfolioModel({ portfolioStocks: [ticker], consideredStocks: [] })
        await newPortfolio.save()
    } catch (error) {
        console.error('Error creating initial portfolio:', error)
        return null
    }
}

export async function addStockToPortfolio(req, res) {
    const { symbol } = req.body
    try {
        const document = await PortfolioModel.findOne()
        if (document && document.portfolioStocks && document.portfolioStocks.length > 0) {
            await PortfolioModel.findByIdAndUpdate(document._id, {
                $addToSet: { portfolioStocks: symbol },
            })
            res.status(201).json({ message: 'Stock added to portfolio', symbol: symbol })
        } else {
            await createInitialPortfolio(symbol)
            res.status(201).json({
                message: 'New portfolio created and stock added',
                symbol: symbol,
            })
        }
    } catch (error) {
        console.error('Error adding stock to portfolio:', error)
        res.status(500).json({ error: 'Error adding stock to portfolio' })
    }
}

export async function getAllPortfolioStocks(req, res) {
    try {
        const document = await PortfolioModel.findOne()
        if (document && document.portfolioStocks.length > 0) {
            const stocks = await Stock.find({ symbol: { $in: document.portfolioStocks } })
            const filteredStocks = stocks.map((stock) => ({
                symbol: stock.symbol,
                name: stock.name,
                marketCap: stock.values.marketCap,
                peRatio: stock.values.peRatio,
                earningsDate: stock.values.earningsDate,
                yearReturn: stock.values.yearReturn,
            }))
            res.json(filteredStocks)
        } else {
            res.json([])
        }
    } catch (error) {
        console.error('Error retrieving portfolio stocks:', error)
        res.status(500).json({ error: 'Error retrieving portfolio stocks' })
    }
}

export async function removeStockFromPortfolio(req, res) {
    const { symbol } = req.body
    try {
        const document = await PortfolioModel.findOne()
        if (document) {
            await PortfolioModel.findByIdAndUpdate(document._id, {
                $pull: { portfolioStocks: symbol },
            })
        }
        res.status(201).json({
            message: 'Stock was from portfolio removed',
            symbol: symbol,
        })
    } catch (error) {
        console.error('Error removing stock from portfolio:', error)
        res.status(500).json({ error: 'Error removing stock from portfolio' })
    }
}

export async function createConsiderPortfolio(symbol) {
    try {
        const newPortfolio = new PortfolioModel({ portfolioStocks: [], consideredStocks: [symbol] })
        await newPortfolio.save()
    } catch (error) {
        console.error('Error creating consider portfolio:', error)
        res.status(500).json({ error: 'Error creating consider portfolio' })
    }
}

export async function addStockToConsider(req, res) {
    const { symbol } = req.body
    console.log('Symbol:', symbol)
    try {
        const document = await PortfolioModel.findOne()

        if (document) {
            await PortfolioModel.findByIdAndUpdate(document._id, {
                $addToSet: { consideredStocks: symbol },
            })
            res.status(201).json({
                message: 'Stock into portfolio added',
                symbol: symbol,
            })
        } else {
            console.log('No document found. Creating a new consider portfolio.')
            await createConsiderPortfolio(symbol)
            res.status(201).json({
                message: 'New consider stocks created and stock added',
                symbol: symbol,
            })
        }
    } catch (error) {
        console.error('Error adding stock to considered stocks:', error)
        res.status(500).json({ error: 'Error adding stock to considered stocks' })
    }
}

export async function getAllConsiderStocks(req, res) {
    try {
        const document = await PortfolioModel.findOne()
        if (document) {
            const stocks = await Stock.find({ symbol: { $in: document.consideredStocks } })
            const filteredStocks = stocks.map((stock) => ({
                symbol: stock.symbol,
                name: stock.name,
                marketCap: stock.values.marketCap,
                peRatio: stock.values.peRatio,
                earningsDate: stock.values.earningsDate,
                yearReturn: stock.values.yearReturn,
            }))
            res.json(filteredStocks)
        } else {
            res.json([])
        }
    } catch (error) {
        console.error('Error retrieving portfolio stocks:', error)
        res.status(500).json({ error: 'Error retrieving portfolio stocks' })
    }
}

export async function removeStockFromConsider(req, res) {
    const { symbol } = req.body
    try {
        const document = await PortfolioModel.findOne()
        if (document && document.consideredStocks && document.consideredStocks.length > 0) {
            await PortfolioModel.findByIdAndUpdate(document._id, {
                $pull: { consideredStocks: symbol },
            })
        }
        res.status(201).json({
            message: 'Stock was from portfolio removed',
            symbol: symbol,
        })
    } catch (error) {
        console.error('Error removing stock from considered stocks:', error)
        res.status(500).json({ error: 'Error removing stock from considered stocks' })
    }
}
