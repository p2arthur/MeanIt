import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userUtils } from 'src/util';
import { PrismaService } from 'src/database/PrismaService';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private userData: any;
  private userUtils: userUtils;
  constructor(private readonly prismaService: PrismaService) {
    this.userUtils = new userUtils();
  }

  //----------------------------------------------------------------------------
  async findOne(id: number) {
    const user = await this.prismaService.user.findFirst({ where: { id } });

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

    this.userData = user;
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

    return this.userData;
  }
}
