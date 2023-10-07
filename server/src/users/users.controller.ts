import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  logHelloWorld() {
    return this.usersServices.logHelloWorld();
  }
}
