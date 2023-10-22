import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';

import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '@prisma/client';

@Controller('/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('/all')
  async getAllPosts() {
    const allPosts = await this.postService.getAllPosts();

    return allPosts;
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createPost(
    @CurrentUser() currentUser: User,
    @Body() body: CreatePostDto,
  ) {
    const post = await this.postService.create(
      body,
      currentUser.wallet_address,
    );

    return post;
  }
}
