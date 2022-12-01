import { IsNotEmpty } from 'class-validator';

export class CreateLazerPayKeyDto {
  @IsNotEmpty()
  secretKey: string;

  @IsNotEmpty()
  publicKey: string;
}
