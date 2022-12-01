import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities';
import { LazerPayKey } from './entities';
import { LazerPayKeyController } from './lazerPayKey.controller';
import { LazerPayKeyService } from './lazerPayKey.service';

@Module({
  imports: [TypeOrmModule.forFeature([LazerPayKey, User])],
  controllers: [LazerPayKeyController],
  providers: [LazerPayKeyService],
  exports: [LazerPayKeyService],
})
export class LazerPayKeyModule {}
