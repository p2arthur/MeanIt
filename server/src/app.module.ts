import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User],
      database: 'db.sqlite',
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
