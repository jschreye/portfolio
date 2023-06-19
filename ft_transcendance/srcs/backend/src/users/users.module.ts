import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends, Users } from 'src/typeorm';
import { UserController } from './users.controller';
import { MatchHistory } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Friends, MatchHistory])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}
