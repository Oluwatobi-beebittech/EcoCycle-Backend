import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { GetStableCoinBalanceDto } from './dto/get-stable-coin-balance.dto';
import { GetStableCoinFundingAddressDto } from './dto/get-stable-coin-funding-address.dto';
import { User } from '../users/entities';

@Injectable()
export class LazerPayOpsService {
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

  async getStableCoinBalance(
    userId: string,
    coin: string,
  ): Promise<Observable<GetStableCoinBalanceDto>> {
    if (!this.publicKey || !this.secretKey) await this.getLazerApiKeys(userId);
    const walletBalanceRoute = '/wallet/balance';
    const fullUrl = `${this.lazerPayBaseApiUrl}${walletBalanceRoute}`;

    const balanceResponse = await this.httpService
      .get(fullUrl, {
        ...this.getHttpHeaders(),
        params: { coin },
      })
      .pipe(map((response) => response.data.data));

    return balanceResponse;
  }

  async getStableCoinFundingAddress(
    userId: string,
    coin: string,
  ): Promise<Observable<GetStableCoinFundingAddressDto>> {
    if (!this.publicKey || !this.secretKey) await this.getLazerApiKeys(userId);
    const fundingAddressRoute = '/crypto/funding/address';
    const fullUrl = `${this.lazerPayBaseApiUrl}${fundingAddressRoute}`;

    const fundingAddressResponse = await this.httpService
      .get(fullUrl, {
        ...this.getHttpHeaders(),
        params: { coin },
      })
      .pipe(map((response) => response.data.data));

    return fundingAddressResponse;
  }
}
