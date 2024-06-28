import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BondYieldService, CronService } from './services';
import { Other, OtherSchema } from './schemas/other.schema';
import { OtherRepository } from './repositories';
import { BondYieldController } from './controllers';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: Other.name, schema: OtherSchema }]),
  ],
  providers: [BondYieldService, CronService, OtherRepository],
  controllers: [BondYieldController],
  exports: [OtherRepository],
})
export class OtherModule {}
