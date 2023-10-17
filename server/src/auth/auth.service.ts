import { Injectable } from '@nestjs/common/decorators';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signup(walletAddress: string) {
    const users: User[] = await this.usersService.find(walletAddress);
    const userExists: boolean = users.length > 0;

    //See if walletAddress is already in use
    if (userExists) {
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
      throw new NotFoundException('');
    }

    if (!user) {
      throw new NotFoundException('User with the given email not found');
    }

    return user;
  }
  //----------------------------------------------------------------------------
}
