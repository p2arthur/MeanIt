import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Community } from './communities.entity';
import { CreateCommunityDto } from './dtos/create-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community) private repo: Repository<Community>,
  ) {}
  private community: Community;

  async create(communityDto: CreateCommunityDto, user: User) {
    console.log(communityDto);
    const cummunityInstance = this.repo.create(communityDto);
    console.log(communityDto);
    this.community = await this.repo.save(cummunityInstance);
    return this.community;
  }

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
