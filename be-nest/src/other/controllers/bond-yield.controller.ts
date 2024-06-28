import { Controller, Get, Post } from '@nestjs/common';
import { BondYieldService } from '../services/bond-yield.service';

@Controller('bond-yield')
export class BondYieldController {
  constructor(private readonly bondYieldService: BondYieldService) {}

  @Get()
  async getBondYield(): Promise<number | null> {
    return this.bondYieldService.fetchBondYield();
  }

  // update current bond yield
  @Post('update')
  async updateBondYield(): Promise<void> {
    try {
      await this.bondYieldService.fetchAndSaveBondYield();
      console.log('Successfully updated bond yield');
    } catch (error) {
      console.error('Failed to update bond yield', error);
    }
  }
}
