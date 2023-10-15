import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(58, 58, {
    message: 'walletAddress must be as string with exactly 58 characters',
  })
  walletAddress: string;
}
