import { EcoChampion } from '@Utilities';
export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  ecoChampion: EcoChampion;
}
