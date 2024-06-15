import {
  Controller,
  Post,
  Param,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CountedService } from '../services';

@Controller('counted')
export class CountedController {
  constructor(private readonly countedService: CountedService) {}

  @Post('update/:symbol')
  async updateStockValues(
    @Param('symbol') symbol: string,
    @Query('periodType', new DefaultValuePipe('annual'))
    periodType: 'annual' | 'quarter',
  ): Promise<void> {
    await this.countedService.updateStockValues(symbol, periodType);
  }
}
