import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities';
import { EcoPayController } from './ecopay.controller';
import { EcoPayService } from './ecopay.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [EcoPayController],
  providers: [EcoPayService],
})
export class EcoPayModule {}
