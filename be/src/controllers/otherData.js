import { fetchBondYield } from '../services/currentYieldUpdate.js'

export const updateBondYield = async (req, res) => {
    try {
        await fetchBondYield()
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
