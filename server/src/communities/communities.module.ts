import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, UsersService, PrismaService],
})
export class CommunitiesModule {}
