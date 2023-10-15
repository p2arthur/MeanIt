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
    console.log('postDto:', postDto);
    const postInstance = this.repo.create(postDto);
    postInstance.user = user;
    this.post = await this.repo.save(postInstance);
    return this.post;
  }

  async getAllPosts(): Promise<Partial<Post>[]> {
    console.log('getting all posts');
    const posts = await this.repo.find();
    console.log(posts);
    return posts.map((post) => {
      return {
        id: post.id,
        user: post.user,
        creation_date: new Date(),
        post_id: post.id,
        creator_id: post.creator_id,
        text_content: post.text_content,
        media: 'https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png',
      };
    });
  }
}
