import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post()
  createPost(@Body() body: PostInterface) {
    this.postsService.create({ content: 'Nice post' });
  }
}
