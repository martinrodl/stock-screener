import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BondYieldService } from './bond-yield.service';

@Injectable()
export class CronService {
  constructor(private bondYieldService: BondYieldService) {}

  @Cron('0 12 * * *') // every day at 12:00
  async updateCurrentBondYield() {
    console.log('Running scheduled task to update bond yield');
    try {
      await this.bondYieldService.fetchAndSaveBondYield();
      console.log('Successfully updated bond yield');
    } catch (error) {
      console.error('Failed to update bond yield', error);
    }
  }
}
