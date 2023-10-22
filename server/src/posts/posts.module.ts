import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, UsersService, PrismaService],
})
export class PostsModule {}
