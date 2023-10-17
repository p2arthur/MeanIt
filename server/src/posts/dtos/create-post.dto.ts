import {
  IsDate,
  IsISO8601,
  IsIn,
  IsInt,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  text_content: string;

  @IsString()
  media: string;

  @IsInt()
  creator_id: number;

  @IsString()
  creator_address: string;

  @IsISO8601()
  creation_date: any;
}
