import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetStableCoinBalanceDto } from './dto/get-stable-coin-balance.dto';
import { GetStableCoinFundingAddressDto } from './dto/get-stable-coin-funding-address.dto';
import { LazerPayOpsService } from './lazerPayOps.service';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'lazerpay',
})
export class LazerPayOpsController {
  constructor(private readonly lazerPayOpsService: LazerPayOpsService) {}

  @Get('/tokens/balance')
  async getStableCoinBalance(
    @Request() req,
  ): Promise<Observable<GetStableCoinBalanceDto>> {
    const {
      user: { userId },
      query: { coin },
    } = req;

    return await this.lazerPayOpsService.getStableCoinBalance(userId, coin);
  }

  @Get('/tokens/address')
  async getStableCoinFundingAddress(
    @Request() req,
  ): Promise<Observable<GetStableCoinFundingAddressDto>> {
    const {
      user: { userId },
      query: { coin },
    } = req;
    return await this.lazerPayOpsService.getStableCoinFundingAddress(
      userId,
      coin,
    );
  }
}
