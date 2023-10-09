import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userUtils } from 'src/util';

@Injectable()
export class UsersService {
  private userData: any;
  private userUtils: userUtils;
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.userUtils = new userUtils();
  }

  //----------------------------------------------------------------------------
  async findOne(walletAddress: string) {
    console.log(walletAddress);
    const user = await this.repo.findOne({ where: { walletAddress } });
    console.log(user);
    this.userData = user;
    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async create(walletAddress: string) {
    const user = await this.findOne(walletAddress);
    console.log(user);

    if (user) {
      console.log('user already exists');
      return user;
    }

    try {
      const userNfd = await this.userUtils.getNfd(walletAddress);
      console.log(userNfd);
      const userName =
        userNfd === ''
          ? this.userUtils.formatWalletAddress(walletAddress)
          : userNfd;
      console.log(userNfd);
      const userData = this.repo.create({
        walletAddress,
        nfd: userNfd,
        username: userName,
        profile_picture:
          'https://i.insider.com/61cc84b94710b10019c77960?width=500&format=jpeg&auto=webp',
      });
      this.userData = await this.repo.save(userData);
      return this.userData;
    } catch (error) {
      console.log(error);
    }
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async remove(walletAddress: string) {
    const user = await this.findOne(walletAddress);
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }

    this.userData = this.repo.remove(user);
    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async update(walletAddress: string, attributes: Partial<User>) {
    const user = await this.findOne(walletAddress);
    console.log('updating user');
    console.log(user);
    console.log(attributes);

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = Object.assign(user, attributes);

    this.userData = this.repo.save(updatedUser);

    return this.userData;
  }
}
