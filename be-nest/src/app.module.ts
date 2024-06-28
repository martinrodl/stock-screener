import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { StocksModule } from './stocks/stocks.module';
import { UsersModule } from './users/users.module';
import { StatusModule } from './status/status.module';
import { UtilsModule } from './utils/utils.module';
import { OtherModule } from './other/other.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    HttpModule.register({}),
    StocksModule,
    UsersModule,
    StatusModule,
    UtilsModule,
    OtherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
