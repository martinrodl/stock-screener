import { updateBondYieldUtils } from '../utils/otherData.js'

export const updateBondYield = async (req, res) => {
    try {
        await updateBondYieldUtils()
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
