import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  coin: string;

  @IsNotEmpty()
  paymentType: string;

  @IsNotEmpty()
  receiverAddress: string;

  additionalNote?: string | undefined;

  weight?: string | undefined;

  itemName?: string | undefined;

  itemQuantity?: string | undefined;
}
