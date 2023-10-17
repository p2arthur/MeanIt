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
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator_address: string;

  @Column()
  community_handle: string;

  @Column()
  text_content: string;

  @Column()
  creation_date: Date;

  @ManyToOne(() => User, (user) => user.communities, { eager: true })
  user: User;

  @AfterUpdate()
  logUpdate() {}

  @AfterInsert()
  logInsert() {}

  @AfterRemove()
  logRemove() {}
}
