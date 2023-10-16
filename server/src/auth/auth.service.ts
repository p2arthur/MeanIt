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
    console.log('walletAddress:', walletAddress);
    const users: User[] = await this.usersService.find(walletAddress);
    console.log(users);

    const userExists: boolean = users.length > 0;

    //See if walletAddress is already in use
    if (userExists) {
      throw new BadRequestException('Wallet Address in use');
    }

    const user = await this.usersService.create(walletAddress);
    console.log('created user:', user);

    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signin(walletAddress: string) {
    console.log('signing wallet addressssss', walletAddress);
    const user = await this.usersService.find(walletAddress);
    console.log('signing find:', user);

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
