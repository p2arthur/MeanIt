import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

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
  createUser(@Body() body: CreateUserDto) {
    user = this.usersServices.create(body.walletAddress);
    return user;
  }

  @Delete('/:address')
  removeUser(@Param('address') address: string) {
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
