import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private repo: Repository<Post>,
    private usersService: UsersService,
  ) {}
  private post: Post;

  async create(postDto: CreatePostDto, user: User) {
    const postInstance = this.repo.create(postDto);
    this.post = await this.repo.save(postInstance);
    return this.post;
  }

  async getAllPosts() {
    const posts = await this.repo.find();
    console.log(posts);
    return posts
      .map((post) => {
        return {
          id: post.id,
          user: this.usersService.find(post.creator_address),
          creation_date: post.creation_date,
          post_id: post.id,
          creator_id: post.creator_id,
          creator_address: post.creator_address,
          text_content: post.text_content,
          media: 'https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png',
        };
      })
      .sort((postA, postB) => postB.post_id - postA.post_id);
  }
}
