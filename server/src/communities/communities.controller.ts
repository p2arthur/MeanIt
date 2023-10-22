import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CommunitiesService } from './communities.service';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';

@Controller('/communities')
export class CommunitiesController {
  constructor(
    private userService: UsersService,
    private communityService: CommunitiesService,
  ) {}

  @Post('/create')
  async createCommunity(
    @CurrentUser() currentUser: User,
    @Body() body: CreateCommunityDto,
  ) {
    const userInstances = await this.userService.find(body.creator_address);

    try {
      const community = await this.communityService.create(
        {
          creator_address: userInstances[0].wallet_address,
          community_handle: 'comm1',
          text_content: 'whaterver',
          creation_date: new Date(),
        },
        userInstances[0],
      );

      return { body, currentUser };
    } catch (error) {
      console.error(error);
    }
  }
}
