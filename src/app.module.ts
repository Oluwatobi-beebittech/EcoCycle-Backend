import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReaderModule } from './blockchainReader/reader.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { EcoPayModule } from './ecopay/ecopay.module';
import { LazerPayKeyModule } from './lazerPayKey/lazerPayKey.module';
import { LazerPayOpsModule } from './lazerPayOps/lazerPayOps.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    ReaderModule,
    AuthModule,
    EcoPayModule,
    LazerPayKeyModule,
    LazerPayOpsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
