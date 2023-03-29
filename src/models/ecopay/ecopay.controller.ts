import { Controller, Body, Request, Post, UseGuards } from '@nestjs/common';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { EcoPayService } from './ecopay.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'ecopay',
})
export class EcoPayController {
  constructor(private readonly ecoPayService: EcoPayService) {}

  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Request() req,
  ): Promise<any> {
    const {
      user: { userId },
    } = req;
    return await this.ecoPayService.createPayment(createPaymentDto, userId);
  }
}
