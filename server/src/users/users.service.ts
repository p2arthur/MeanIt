import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userUtils } from 'src/util';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsersService {
  private userData: any;
  private userUtils: userUtils;
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly prismaService: PrismaService,
  ) {
    this.userUtils = new userUtils();
  }

  //----------------------------------------------------------------------------
  async findOne(id: number) {
    const user = await this.repo.findOneBy({
      id: id,
    });
    console.log('findone******* id', id);
    this.userData = user;
    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async create(wallet_address: string) {
    const users = await this.prismaService.user.findUnique({
      where: { wallet_address },
    });

    if (users) {
      return users;
    }

    try {
      const nfd_username = await this.userUtils.getNfd(wallet_address);
      const user_name =
        nfd_username === ''
          ? this.userUtils.formatWalletAddress(wallet_address)
          : nfd_username;
      const user = await this.prismaService.user.create({
        data: {
          wallet_address: wallet_address,
          nfd_username: nfd_username,
          meanit_username: user_name,
          profile_picture:
            'https://i.insider.com/61cc84b94710b10019c77960?width=500&format=jpeg&auto=webp',
        },
      });

      this.userData = user;
      return this.userData;
    } catch (error) {}
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------

  async find(wallet_address: string) {
    const user = await this.prismaService.user.findUnique({
      where: { wallet_address },
    });

    if (!user) {
      throw new NotFoundException(
        "Couldn't find a user with the given wallet_address",
      );
    }

    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async remove(wallet_address: string) {
    const user = await this.prismaService.user.findUnique({
      where: { wallet_address },
    });
    if (!user) {
      throw new NotFoundException();
    }

    this.userData = this.prismaService.user.delete({
      where: { wallet_address },
    });
    return this.userData;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async update(user_id: number, attributes: Partial<User>) {
    const user = await this.findOne(user_id);
    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = Object.assign(user, attributes);

    this.userData = this.repo.save(updatedUser);

    return this.userData;
  }
}
