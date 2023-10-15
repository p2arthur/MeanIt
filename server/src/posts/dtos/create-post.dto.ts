import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  text_content: string;
}
