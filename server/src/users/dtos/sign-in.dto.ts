import { IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  walletAddress: string;
}
