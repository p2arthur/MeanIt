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
    this.post = await this.repo.save(postInstance);
    return this.post;
  }

  async getAllPosts(): Promise<Partial<Post>[]> {
    const posts = await this.repo.find();
    return posts
      .map((post) => {
        return {
          id: post.id,
          user: post.user,
          creation_date: post.creation_date,
          post_id: post.id,
          creator_id: post.creator_id,
          text_content: post.text_content,
          media: 'https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png',
        };
      })
      .sort((postA, postB) => postB.post_id - postA.post_id);
  }
}
