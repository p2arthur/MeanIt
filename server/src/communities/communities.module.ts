import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Community } from './communities.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, UsersService],
})
export class CommunitiesModule {}
