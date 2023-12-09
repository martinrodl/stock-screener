import axios from 'axios'
import OtherData from '../models/otherData.js'

export const fetchBondYield = async () => {
    const url = `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=20year&apikey=${process.env.ALPHAVANTAGE_KEY}`

    try {
        const response = await axios.get(url)
        const data = response.data
        const currentYield = data.data[0].value
        const otherData = new OtherData({ currentYield: currentYield })
        await otherData.save()
        return currentYield
    } catch (error) {
        console.error('Error fetching bond yield data:', error.message)
        return null
    }
}
