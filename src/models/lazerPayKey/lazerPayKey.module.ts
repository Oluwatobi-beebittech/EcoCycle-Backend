import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LazerPayKey } from './entities';
import { LazerPayKeyController } from './lazerPayKey.controller';
import { LazerPayKeyService } from './lazerPayKey.service';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([LazerPayKey, User])],
  controllers: [LazerPayKeyController],
  providers: [LazerPayKeyService],
  exports: [LazerPayKeyService],
})
export class LazerPayKeyModule {}
