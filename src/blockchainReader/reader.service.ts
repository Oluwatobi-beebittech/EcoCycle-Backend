import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { GetEcoTokenBalanceDto } from './dto/get-ecotoken-balance.dto';

@Injectable()
export class ReaderService {
  private config;
  private alchemy;

  constructor(private configService: ConfigService) {
    this.config = {
      apiKey: this.configService.get<string>('ECO_ALCHEMY_API_KEY'),
      network: Network.MATIC_MUMBAI,
    };
    this.alchemy = new Alchemy(this.config);
  }

  async getTokenBalance(walletAddress: string): Promise<GetEcoTokenBalanceDto> {
    const ecoTokenContractAddress = this.configService.get<string>(
      'ECO_TOKEN_CONTRACT_ADDRESS',
    );
    const ecoTokenDecimals = Number(
      this.configService.get<string>('ECO_TOKEN_DECIMALS'),
    );

    const tokenBalancesData = await this.alchemy.core.getTokenBalances(
      walletAddress,
      [ecoTokenContractAddress],
    );
    const { tokenBalance } = tokenBalancesData.tokenBalances.find(
      ({ contractAddress }) => contractAddress === ecoTokenContractAddress,
    );
    const formattedTokenBalance = ethers.utils.formatUnits(
      tokenBalance,
      ecoTokenDecimals,
    );

    return {
      walletAddress: tokenBalancesData.address,
      tokenBalance: formattedTokenBalance,
    };
  }
}
