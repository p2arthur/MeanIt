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

@Controller()
export class AppController {
  @Get('/home')
  goHome() {
    return 'Hello from home';
  }
}
