import os from "os";

export const getStatus = (req, res) => {
  res.json({
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    cpuLoad: os.loadavg(),
    cpuCount: os.cpus().length,
  });
};
