import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  text_content: string;

  @IsString()
  media: string;

  @IsInt()
  creator_id: number;
}
