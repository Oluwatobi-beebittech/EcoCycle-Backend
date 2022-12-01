import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class EcoPayService {
  constructor(private configService: ConfigService) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    console.log(createPaymentDto);
  }
}
