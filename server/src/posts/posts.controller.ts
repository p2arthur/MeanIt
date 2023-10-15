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

@Controller('/post')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(@CurrentUser() currentUser: User, @Body() body: CreatePostDto) {
    const post = this.postService.create(body, currentUser);
    return post;
  }
}
