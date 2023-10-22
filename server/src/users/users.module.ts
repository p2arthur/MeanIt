import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [],
  providers: [UsersService, AuthService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
