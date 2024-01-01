import mongoose from 'mongoose'

const othersSchema = new mongoose.Schema(
    {
        currentYield: { type: Number, default: 1 },
        minMarketCap: { type: Number, default: 5000000000 },
    },
    { timestamps: true }
)

const Data = mongoose.model('Data', othersSchema)

export default Data
