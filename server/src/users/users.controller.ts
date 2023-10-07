import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

let user;

@Controller('auth')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get('/:address')
  findUser(@Param('address') address: string) {
    user = this.usersServices.findOne(address);
    return user;
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    user = this.usersServices.create(body.walletAddress);
    return user;
  }
}
