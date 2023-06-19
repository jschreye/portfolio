import { Module, NestModule, MiddlewareConsumer,  } from '@nestjs/common';
import { AuthorizationMiddleware } from './authorization.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ProfileModule } from './profile/profile.module';
import { AppGateway } from './app/app.gateway';
import { ChatModule } from './chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule'
import { GameModule } from './game/game.module';
import { JwtModule } from '@nestjs/jwt';
import { SocketModule } from './socket/socket.module';
import { RequestMethod } from '@nestjs/common';
import { Server } from 'socket.io';
import DataSourceOptions from 'db/data-source';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), // load and parse .env and imports it (true)
    TypeOrmModule.forRoot({
            type: 'postgres', //type of database
            url: 'postgresql://mchalard:mchalard@db:5432/postgres',
            host: process.env.POSGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: 'postgres',
            //entities: entities, //entities are used to create table in you database
			      entities: ['dist/src/typeorm/*.entity.js'],
            synchronize: false,  // update table in realtime
            migrations: ['dist/db/migrations/*.js'],
    }),
    ScheduleModule.forRoot(),

    AuthModule,
    UsersModule,
    ProfileModule,
    HttpModule,
    ChatModule,
    GameModule,
    JwtModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService,

  AppGateway
  ],
  //exports: [AppGateway]
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude('auth/(.*)', '2fa/authenticate')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }}
