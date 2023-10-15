import { IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  wallet_address: string;
}
