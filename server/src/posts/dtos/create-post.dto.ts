import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  text_content: string;

  @IsString()
  media: string;

  @IsString()
  creator_id: number;
}
