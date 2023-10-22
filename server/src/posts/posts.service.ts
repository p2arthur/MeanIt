import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { User, Post } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}
  private post: Post;

  async create(createPostDto: CreatePostDto, wallet_address: string) {
    const user = await this.prismaService.user.findFirst({
      where: { wallet_address: wallet_address },
    });

    const postInstance = this.prismaService.post.create({
      data: {
        text_content: createPostDto.text_content,
        media: createPostDto.media,
        creation_date: new Date().toISOString(),
        user: {
          connect: { id: user.id }, // Establish the user-post relation
        },
      },
    });

    return postInstance;
  }

  async getAllPosts() {
    const posts = await this.prismaService.post.findMany({});

    return posts
      .map((post) => {
        return {
          id: post.id,
          user: this.usersService.find(post.creator),
          creation_date: post.creation_date,
          post_id: post.id,
          creator_id: post.creator,
          creator_address: post.creator,
          text_content: post.text_content,
          media: 'https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png',
        };
      })
      .sort((postA, postB) => postB.id - postA.post_id);
  }
}
