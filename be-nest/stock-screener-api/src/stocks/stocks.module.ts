import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { Stock, StockSchema } from './schemas/stock.schema';
import { FmpModule } from './fmp/fmp.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    HttpModule,
    forwardRef(() => FmpModule), // Use forwardRef here
  ],
  controllers: [StocksController],
  providers: [StocksService, StocksRepository],
  exports: [MongooseModule, StocksService], // Export MongooseModule to make StockModel available
})
export class StocksModule {}
