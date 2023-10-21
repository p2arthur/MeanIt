import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([User])],
  controllers: [PostsController],
  providers: [PostsService, UsersService, PrismaService],
})
export class PostsModule {}
