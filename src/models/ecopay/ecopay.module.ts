import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EcoPayController } from './ecopay.controller';
import { EcoPayService } from './ecopay.service';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [EcoPayController],
  providers: [EcoPayService],
})
export class EcoPayModule {}
