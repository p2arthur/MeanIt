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
  async findOne(wallet_address: string) {
    console.log('Find One:', wallet_address);
    const user = await this.repo.findOne({
      where: { wallet_address: wallet_address },
    });
    console.log(user);
    this.userData = user;
    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async create(wallet_address: string) {
    const user = await this.findOne(wallet_address);
    console.log(user);

    if (user) {
      console.log('user already exists');
      return user;
    }

    try {
      const nfd_username = await this.userUtils.getNfd(wallet_address);
      console.log(nfd_username);
      const user_name =
        nfd_username === ''
          ? this.userUtils.formatWalletAddress(wallet_address)
          : nfd_username;
      console.log(nfd_username);
      const userData = this.repo.create({
        wallet_address: wallet_address,
        nfd_username: nfd_username,
        meanit_username: user_name,
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

  async find(walletAddress: string) {
    const user = await this.repo.find({
      where: { wallet_address: walletAddress },
    });
    console.log(user);
    return user;
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
