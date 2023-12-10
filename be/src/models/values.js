import mongoose from 'mongoose'

const actualValues = new mongoose.Schema(
    {
        exchange: String,
        peRatio: {
            type: Number,
            default: null,
        },
        marketCap: Number,
        date: String,
        dcf: Number,
        price: Number,
        intrinsicValue: Number,
        peterlynchValue: Number,
    },
    { timestamps: true }
)

const Values = mongoose.model('Values', actualValues)

export default Values
