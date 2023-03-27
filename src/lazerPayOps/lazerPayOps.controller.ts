import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GetStableCoinBalanceDto } from './dto/get-stable-coin-balance.dto';
import { GetStableCoinFundingAddressDto } from './dto/get-stable-coin-funding-address.dto';
import { LazerPayOpsService } from './lazerPayOps.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
