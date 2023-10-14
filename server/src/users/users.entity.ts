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
  walletAddress: string;

  @Column()
  nfd: string | undefined;

  @Column()
  username: string;

  @Column()
  profile_picture: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with wallet address:', this.walletAddress);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with wallet address:', this.walletAddress);
  }

  @AfterRemove()
  logRemove() {
    console.log('Updated user with wallet address:', this.walletAddress);
  }
}
