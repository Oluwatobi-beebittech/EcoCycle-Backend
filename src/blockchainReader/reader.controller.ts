import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReaderService } from './reader.service';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: '/ecotoken',
})
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('/balance/:walletAddress')
  findOne(@Param('walletAddress') walletAddress: string): string {
    return this.readerService.getTokenBalance(walletAddress);
  }
}
