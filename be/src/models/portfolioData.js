import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    portfolioStocks: [String],
    consideredStocks: [String],
})

const PortfolioModel = mongoose.model('Portfolio', schema)

export default PortfolioModel
