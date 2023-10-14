import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { Post } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User, Post],
      database: 'db.sqlite',
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    Post,
    PostsModule,
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
