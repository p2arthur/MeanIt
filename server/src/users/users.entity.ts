import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletAddress: string;

  @Column()
  nfd: string | undefined;

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
