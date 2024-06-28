import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StatusService {
  getStatus() {
    try {
      const packageJsonPath = path.join(__dirname, '../../package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      return {
        version: packageJson.version,
        updated: 1,
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        cpuLoad: os.loadavg(),
        cpuCount: os.cpus().length,
      };
    } catch (error) {
      console.error('Error reading package.json:', error);
      throw new Error('Internal Server Error');
    }
  }
}
