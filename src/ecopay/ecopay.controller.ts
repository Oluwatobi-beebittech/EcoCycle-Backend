import {
  Controller,
  Body,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';

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
