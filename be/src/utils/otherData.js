import OtherData from '../models/otherData.js'
import { fetchBondYield } from '../services/fetchYieldUpdate.js'

export const updateBondYieldUtils = async () => {
    try {
        const currentYield = await fetchBondYield()
        const otherData = new OtherData({ currentYield: currentYield })
        await otherData.save()
        return currentYield
    } catch (error) {
        console.error('Error fetching bond yield data:', error.message)
        return null
    }
}
