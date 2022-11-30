import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ReaderService {
  private config;
  constructor(private configService: ConfigService) {
    this.config = {
      apiKey: this.configService.get<string>('ECO_ALCHEMY_API_KEY'),
      network: "Network.MATIC_MUMBAI",
    };
  }

  getTokenBalance(walletAddress: string): string {
    console.log(this.config);
    return this.configService.get<string>('ECO_ALCHEMY_API_KEY');
  }
}
