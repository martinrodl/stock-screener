import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BondYieldService, CronService } from './services';
import { Other, OtherSchema, Progress, ProgressSchema } from './schemas';
import { OtherRepository, ProgressRepository } from './repositories';
import { BondYieldController } from './controllers';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: Other.name, schema: OtherSchema },
      { name: Progress.name, schema: ProgressSchema },
    ]),
  ],
  providers: [
    BondYieldService,
    CronService,
    OtherRepository,
    ProgressRepository,
  ],
  controllers: [BondYieldController],
  exports: [OtherRepository, ProgressRepository],
})
export class OtherModule {}
