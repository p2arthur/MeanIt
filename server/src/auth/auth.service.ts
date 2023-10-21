import { Injectable } from '@nestjs/common/decorators';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly prismaServices: PrismaService,
  ) {}
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signup(walletAddress: string) {
    const users = await this.prismaServices.user.findFirst({
      where: { wallet_address: walletAddress },
    });

    console.log(users);

    //See if walletAddress is already in use
    if (users) {
      throw new BadRequestException('Wallet Address in use');
    }

    const user = await this.usersService.create(walletAddress);
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signin(walletAddress: string) {
    const user = await this.usersService.find(walletAddress);

    if (!user) {
      throw new NotFoundException('User with the given email not found');
    }

    return user;
  }
  //----------------------------------------------------------------------------
}
