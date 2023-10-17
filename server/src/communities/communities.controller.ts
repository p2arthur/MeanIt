import { Body, Controller, Post } from '@nestjs/common';
import { Community } from './communities.entity';
import { CreateCommunityDto } from './dtos/create-community.dto';
import { User } from 'src/users/users.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CommunitiesService } from './communities.service';
import { UsersService } from 'src/users/users.service';

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
    console.log(body);

    const userInstance = await this.userService.findOne(currentUser.id);

    console.log('Current user:', userInstance);

    const community = await this.communityService.create(
      {
        creator_address: userInstance.wallet_address,
        community_handle: 'comm1',
        text_content: 'whaterver',
        creation_date: new Date(),
      },
      userInstance,
    );

    console.log('community:', community);

    return { body, currentUser };
  }
}
