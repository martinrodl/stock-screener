import os from 'os'

export const getStatus = (req, res) => {
    res.json({
        version: '1.0.0',
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        cpuLoad: os.loadavg(),
        cpuCount: os.cpus().length,
    })
}
