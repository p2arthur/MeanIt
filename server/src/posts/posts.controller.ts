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
    console.log(allPosts);
    return allPosts;
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createPost(
    @CurrentUser() currentUser: User,
    @Body() body: CreatePostDto,
  ) {
    console.log('create post body', body);
    const post = await this.postService.create(body, currentUser);
    console.log(post);
    return post;
  }
}
