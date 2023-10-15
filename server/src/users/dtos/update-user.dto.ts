import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  meanit_username: string;

  @IsOptional()
  @IsString()
  nfd: string;
}
