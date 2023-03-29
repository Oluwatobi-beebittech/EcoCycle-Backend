import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { GetEcoTokenBalanceDto } from './dto/get-ecotoken-balance.dto';
import { ReaderService } from './reader.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: '/ecotoken',
})
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('/balance/:walletAddress')
  async findOne(
    @Param('walletAddress') walletAddress: string,
  ): Promise<GetEcoTokenBalanceDto> {
    return this.readerService.getTokenBalance(walletAddress);
  }
}
