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

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with wallet address:', this.wallet_address);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with wallet address:', this.wallet_address);
  }

  @AfterRemove()
  logRemove() {
    console.log('Updated user with wallet address:', this.wallet_address);
  }
}
