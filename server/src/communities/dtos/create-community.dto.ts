import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateCommunityDto {
  @IsString()
  @Column()
  creator_address: number;

  @Column()
  community_handle: string;

  @Column()
  text_content: string;

  @Column()
  creation_date: Date;
}
