import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { APP_PIPE } from '@nestjs/core/constants';
import { AppController } from './app.controller';
import { CommunitiesModule } from './communities/communities.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [UsersModule, PostsModule, CommunitiesModule],
  controllers: [AppController],

  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['b30ak6v42w0'],
        }),
      )
      .forRoutes('*');
  }
}
