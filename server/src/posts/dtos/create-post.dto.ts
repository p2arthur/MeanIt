import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  text_content: string;

  @IsString()
  media: string;
}
