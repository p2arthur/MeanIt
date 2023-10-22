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

    //See if walletAddress is already in use
    if (users) {
      throw new BadRequestException('Wallet Address in use');
    }

    const user = await this.usersService.create(walletAddress);
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signin(wallet_address: string) {
    const user = await this.usersService.find(wallet_address);

    if (!user) {
      throw new NotFoundException(
        'User with the given walllet address not found',
      );
    }

    return user;
  }
  //----------------------------------------------------------------------------
}
