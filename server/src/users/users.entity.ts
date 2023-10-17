import { Community } from 'src/communities/communities.entity';
import { Post } from 'src/posts/posts.entity';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet_address: string;

  @Column()
  nfd_username: string | undefined;

  @Column()
  meanit_username: string;

  @Column()
  profile_picture: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Community, (community) => community.creator_address)
  communities: Community[];

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
