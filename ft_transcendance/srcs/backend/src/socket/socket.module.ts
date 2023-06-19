import { Module, Global } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SocketService } from './socket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends, MatchHistory, Users } from 'src/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, Friends, MatchHistory])],
    controllers: [],
    providers: [SocketService, UsersService],
    exports: [SocketService]
  })
  export class SocketModule {}