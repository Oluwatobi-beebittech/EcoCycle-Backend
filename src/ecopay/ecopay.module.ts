import { Module } from '@nestjs/common';

import { EcoPayController } from './ecopay.controller';
import { EcoPayService } from './ecopay.service';

@Module({
  imports: [],
  controllers: [EcoPayController],
  providers: [EcoPayService],
})
export class EcoPayModule {}
