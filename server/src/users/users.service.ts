import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  logHelloWorld() {
    console.log('first');
    return 'Hello World';
  }
}
