import os from 'os'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const getStatus = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const packageJsonPath = path.join(__dirname, '../../package.json')
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

        res.json({
            version: packageJson.version,
            freeMemory: os.freemem(),
            totalMemory: os.totalmem(),
            cpuLoad: os.loadavg(),
            cpuCount: os.cpus().length,
        })
    } catch (error) {
        console.error('Error reading package.json:', error)
        res.status(500).send('Internal Server Error')
    }
}
