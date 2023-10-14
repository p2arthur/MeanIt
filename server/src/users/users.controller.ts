import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Address } from '@randlabs/myalgo-connect';

let user;

@Controller('auth')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get('/:address')
  async findUser(@Param('address') address: string) {
    user = await this.usersServices.findOne(address);
    return user;
  }

  @Post('/signup')
  signupUser(@Body() body: CreateUserDto, @Session() session: any) {
    user = this.usersServices.create(body.walletAddress);

    session.userId = user.id;

    return user;
  }

  @Post()
  signinUser(@Body() walletAddress: Address, @Session() session: any) {
    this.usersServices.findOne(walletAddress);
    session.userId = user.id;
  }

  @Delete('/:address')
  removeUser(@Param('address') address: string, @Session() session: any) {
    user = this.usersServices.remove(address);

    return user;
  }

  @Patch('/:address')
  async updateUser(
    @Param('address') address: string,
    @Body() body: UpdateUserDto,
  ) {
    user = await this.usersServices.update(address, body);
    return user;
  }
}
