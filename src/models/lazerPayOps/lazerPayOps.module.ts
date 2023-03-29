import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LazerPayOpsController } from './lazerPayOps.controller';
import { LazerPayOpsService } from './lazerPayOps.service';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [LazerPayOpsController],
  providers: [LazerPayOpsService],
  exports: [LazerPayOpsService],
})
export class LazerPayOpsModule {}
