import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

let user;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(walletAddress: string) {
    user = this.repo.find({ where: { walletAddress } });
  }

  create(walletAddress: string) {
    user = this.repo.create({ walletAddress });
    user = this.repo.save(user);
    return user;
  }
}
