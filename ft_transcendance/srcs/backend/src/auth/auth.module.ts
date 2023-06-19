import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { ProfileModule } from 'src/profile/profile.module';
import { Stats, Users } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { HttpModule } from '@nestjs/axios';
import { ProfileService } from 'src/profile/profile.service';
import { TwoFactorAuthenticationController } from './controllers/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './services/twoFactorAuthentication.service';

// to remove (profile service)
@Module({
  imports: [UsersModule, 
            ProfileModule,
            PassportModule,
            HttpModule,
            JwtModule.registerAsync(jwtConfig),
            TypeOrmModule.forFeature([Users, Stats])],
  providers: [AuthService, JwtStrategy, ProfileService, TwoFactorAuthenticationService],
  controllers: [AuthController, TwoFactorAuthenticationController],
  exports: [AuthService]
})
export class AuthModule {}
