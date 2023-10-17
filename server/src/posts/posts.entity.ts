import { User } from 'src/users/users.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  AfterUpdate,
  AfterInsert,
  AfterRemove,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text_content: string;

  @Column()
  media: string;

  @Column()
  creator_id: number;

  @Column()
  creation_date: Date;

  @Column()
  creator_address: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @AfterUpdate()
  logUpdate() {}

  @AfterInsert()
  logInsert() {}

  @AfterRemove()
  logRemove() {}
}
