import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}
  private post: Post;

  async create(postDto: CreatePostDto, user: User) {
    const postInstance = this.repo.create(postDto);
    postInstance.user = user;
    this.post = await this.repo.save(postInstance);
    return this.post;
  }
}
