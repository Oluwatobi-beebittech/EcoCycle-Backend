import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Alchemy, AlchemySettings, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';

import { GetEcoTokenBalanceDto } from './dto/get-ecotoken-balance.dto';

@Injectable()
export class ReaderService {
  private config: AlchemySettings;
  private alchemy: Alchemy;

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

    const { address, tokenBalances } = await this.alchemy.core.getTokenBalances(
      walletAddress,
      [ecoTokenContractAddress],
    );
    const { tokenBalance } = tokenBalances.find(
      ({ contractAddress }) => contractAddress === ecoTokenContractAddress,
    );
    const formattedTokenBalance = ethers.utils.formatUnits(
      tokenBalance,
      ecoTokenDecimals,
    );

    return {
      walletAddress: address,
      tokenBalance: formattedTokenBalance,
    };
  }
}
