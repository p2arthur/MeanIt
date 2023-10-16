import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Address } from '@randlabs/myalgo-connect';
import { User } from './users.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { SignInUserDto } from './dtos/sign-in.dto';
import { AuthGuard } from 'src/guards/auth.guard';

let user: User;

@Controller('/auth')
export class UsersController {
  constructor(
    private usersServices: UsersService,
    private authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get('/session')
  getUserSession(@CurrentUser() currentUser: User, @Session() session: any) {
    return session;
  }

  @Post('/signin')
  async signinUser(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.wallet_address);
    const userId = user[0].id;
    session.userId = userId;
    return session;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.walletAddress);
    session.userId = user.id;
    return user;
  }

  @Get('/signout')
  async signoutUser(@Session() session: any) {
    session.userId = null;
    return session;
  }

  @Get('/:address')
  async findUser(
    @Param('address') wallet_address: string,
    @CurrentUser() currentUser: User,
  ) {
    const usersArray = await this.usersServices.find(wallet_address);
    user = usersArray[0];
    return user;
  }

  // @UseGuards(AuthGuard)
  // @Delete('/:address')
  // async removeUser(@Param('address') address: string, @Session() session: any) {
  //   user = await this.usersServices.remove(session.userId);

  //   return user;
  // }

  // // @UseGuards(AuthGuard)
  // @Patch('/:address')
  // async updateUser(
  //   @Param('address') address: string,
  //   @Body() body: UpdateUserDto,
  //   @Session() session: any,
  // ) {
  //   user = await this.usersServices.update(session.userId, body);
  //   return user;
  // }
}
