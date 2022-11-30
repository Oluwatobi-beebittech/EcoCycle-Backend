import { IsNotEmpty } from 'class-validator';

export class GetEcoTokenBalanceDto {
  @IsNotEmpty()
  walletAddress: string;
}
