import { IsNotEmpty } from 'class-validator';

export class UpdateLazerPayKeyDto {
  @IsNotEmpty()
  secretKey: string;

  @IsNotEmpty()
  publicKey: string;
}
