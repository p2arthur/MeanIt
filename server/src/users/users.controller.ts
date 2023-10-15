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
import { User } from './users.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { SignInUserDto } from './dtos/sign-in.dto';

let user: User;

@Controller('auth')
export class UsersController {
  constructor(
    private usersServices: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/session')
  getUserSession(@CurrentUser() currentUser: User) {
    console.log('session:', currentUser);
  }

  @Get('/:address')
  async findUser(@Param('address') address: string) {
    user = await this.usersServices.findOne(address);
    return user;
  }

  @Post('/signup')
  async signupUser(@Body() body: CreateUserDto, @Session() session: any) {
    console.log('Body:', body);
    console.log(session);
    user = await this.usersServices.create(body.walletAddress);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signinUser(@Body() body: SignInUserDto, @Session() session: any) {
    console.log('receiving a request to signin', session);
    const walletAddress = body.walletAddress;

    const user = await this.authService.signin(walletAddress);
    session.userId = user;
    console.log(session.id);
  }

  @Delete('/:address')
  async removeUser(@Param('address') address: string, @Session() session: any) {
    user = await this.usersServices.remove(address);

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
