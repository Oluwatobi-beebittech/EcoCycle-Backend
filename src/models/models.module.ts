import { Module } from '@nestjs/common';

import { ReaderModule } from './blockchainReader/reader.module';
import { EcoPayModule } from './ecopay/ecopay.module';
import { LazerPayKeyModule } from './lazerPayKey/lazerPayKey.module';
import { LazerPayOpsModule } from './lazerPayOps/lazerPayOps.module';
import { UsersModule } from './users/users.module';

const models = [
  UsersModule,
  ReaderModule,
  EcoPayModule,
  LazerPayKeyModule,
  LazerPayOpsModule,
];

@Module({
  imports: models,
  exports: models,
})
export class ModelsModule {}
