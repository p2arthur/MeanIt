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
import { User } from '../users/users.entity';
import { AuthGuard } from 'src/guards/auth.guard';

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
  createPost(@CurrentUser() currentUser: User, @Body() body: CreatePostDto) {
    console.log('Current user:', currentUser);

    const postObject = Object.assign(body, {
      creator_id: 1,
    });
    const post = this.postService.create(postObject, currentUser);
    return post;
  }
}
