import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { Community, User } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prismaService: PrismaService) {}
  private community: Community;

  async create(communityDto: CreateCommunityDto, user: User) {}

  // async getAllPosts(): Promise<Partial<Post>[]> {
  //   const posts = await this.repo.find();
  //   return posts
  //     .map((post) => {
  //       return {
  //         id: post.id,
  //         user: post.user,
  //         creation_date: post.creation_date,
  //         post_id: post.id,
  //         creator_id: post.creator_id,
  //         text_content: post.text_content,
  //         media: 'https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png',
  //       };
  //     })
  //     .sort((postA, postB) => postB.post_id - postA.post_id);
  // }
}
