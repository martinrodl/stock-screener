import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountedController } from './counted.controller';
import { CountedService } from './counted.service';

import { ActualValuesRepository } from './repositories/actual-values.repository';
import {
  ActualValues,
  ActualValuesSchema,
} from './schemas/actual-values.schema';
import { Stock, StockSchema } from '../schemas/stock.schema';

import { StocksModule } from '../stocks.module';
import { FmpModule } from '../fmpModule/fmp.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActualValues.name, schema: ActualValuesSchema },
      { name: Stock.name, schema: StockSchema },
    ]),
    forwardRef(() => StocksModule),
    FmpModule,
  ],
  providers: [CountedService, ActualValuesRepository],
  controllers: [CountedController],
})
export class CountedModule {}
