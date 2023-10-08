import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userUtils } from 'src/util';

@Injectable()
export class UsersService {
  private userData: User | User[];
  private userUtils: userUtils;
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.userUtils = new userUtils();
  }

  async findOne(walletAddress: string) {
    this.userData = await this.repo.find({ where: { walletAddress } });
    return this.userData;
  }

  async create(walletAddress: string) {
    const user = await this.findOne(walletAddress);

    const userExists = user.length > 0;

    if (userExists) {
      console.log('user already exists');
      return null;
    }
    try {
      const userNfd = await this.userUtils.getNfd(walletAddress);
      console.log(userNfd);
      const userData = this.repo.create({ walletAddress, nfd: userNfd });
      this.userData = await this.repo.save(userData);
      return this.userData;
    } catch (error) {}
  }
}
