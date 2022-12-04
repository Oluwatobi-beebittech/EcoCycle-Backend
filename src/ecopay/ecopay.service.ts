import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from '../users/entities';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class EcoPayService {
  private publicKey;
  private secretKey;
  private lazerPayBaseApiUrl;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.lazerPayBaseApiUrl = this.configService.get<string>(
      'LAZER_PAY_BASE_API_URL',
    );
  }

  async getLazerApiKeys(userId: string) {
    const { lazerPayKey } = await this.userRepository.findOne({
      where: { userId },
      relations: {
        lazerPayKey: true,
      },
    });
    this.publicKey = lazerPayKey?.publicKey ?? '';
    this.secretKey = lazerPayKey?.secretKey ?? '';
  }

  getHttpHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'X-api-key': this.publicKey,
      },
    };
  }

  async createPayment(
    createPaymentDto: CreatePaymentDto,
    userId: string,
  ): Promise<Observable<any>> {
    if (!this.publicKey || !this.secretKey) await this.getLazerApiKeys(userId);
    const payoutRoute = '/crypto/payouts/initiate';
    const fullUrl = `${this.lazerPayBaseApiUrl}${payoutRoute}`;
    const { receiverBEP20Address, additionalNote, coin, amount } =
      createPaymentDto;
    const lazerPayPayoutPayload = {
      amount: Number(amount),
      recipient: receiverBEP20Address,
      coin: coin,
      blockchain: 'Binance Smart Chain',
      metadata: additionalNote,
    };

    const payoutResponse = await this.httpService
      .post(fullUrl, lazerPayPayoutPayload, {
        ...this.getHttpHeaders(),
      })
      .pipe(map((response) => response.data));

    return payoutResponse;
  }
}
