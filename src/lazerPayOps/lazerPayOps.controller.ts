import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetStableCoinsBalanceDto } from './dto/get-stable-coins-balance.dto';
import { LazerPayOpsService } from './lazerPayOps.service';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'lazerpay',
})
export class LazerPayOpsController {
  constructor(private readonly lazerPayOpsService: LazerPayOpsService) {}

  @Get('/tokens/balance')
  async getTokensBalance(
    @Request() req,
  ): Promise<Observable<GetStableCoinsBalanceDto>> {
    const {
      user: { userId },
    } = req;
    return await this.lazerPayOpsService.getTokensBalance(userId);
  }
}
