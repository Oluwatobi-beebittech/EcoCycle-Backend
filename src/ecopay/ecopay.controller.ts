import { Controller, Body, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { EcoPayService } from './ecopay.service';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'ecopay',
})
export class EcoPayController {
  constructor(private readonly ecoPayService: EcoPayService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<any> {
    return await this.ecoPayService.createPayment(createPaymentDto);
  }
}
