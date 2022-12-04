import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from '../users/entities';
import { GetStableCoinsBalanceDto } from './dto/get-stable-coins-balance.dto';

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

  async getTokensBalance(
    userId: string,
  ): Promise<Observable<GetStableCoinsBalanceDto>> {
    if (!this.publicKey || !this.secretKey) await this.getLazerApiKeys(userId);
    const walletBalanceRoute = 'wallet/balance';
    const fullUrl = `${this.lazerPayBaseApiUrl}${walletBalanceRoute}`;
    console.log({
      pk: this.publicKey,
      sk: this.secretKey,
    });
    let balanceResponse;
    try {
      balanceResponse = await this.httpService
        .get(fullUrl, {
          ...this.getHttpHeaders(),
        })
        .pipe(map((response) => response.data));
    } catch (error) {
      console.log('error');
    }

    return balanceResponse;
  }
}
