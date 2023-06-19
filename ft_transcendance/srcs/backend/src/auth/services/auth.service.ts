import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm';
import { ProfileService } from 'src/profile/profile.service';
import { HttpService } from '@nestjs/axios';
import {firstValueFrom } from 'rxjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        private profileService: ProfileService,
        private jwtService: JwtService, 
        private readonly httpService: HttpService
        ) {}

    /** @description */
     /* ask the api for infos about the user using its token
     * check if the returned login exists in our database
     * -> if it doesn't it will create a new user using the infos returned by the api
     * -> it will then link the user (new or old) to the state
     */
    async registerUser(apiToken: any) {
        try {
            const {data} = await firstValueFrom(this.httpService.get(`https://api.intra.42.fr/v2/me`,   // request to the 42 API infos of the user
            {
              headers: { Authorization: `Bearer ${apiToken}`},          // token given by the API in the previous step
            },
          ))
          const user = await this.userRepository.findOne({ // cherche le user dans la base de donnee
            where: {
                email: data.email,
                }
            })
            if (!user)                                                  // if the user never went on the website create a new one
            {
                const newUser = await this.profileService.createProfile(data);
                console.log("register this is the new user:", newUser);
                return this.generateAccessToken(newUser)
            } 
            else
            {
                console.log("register this is the user:", user);
                if (user.doubleAuth == true) {
                    return {
                        doubleAuth: true,
                        nickname: user.nickname
                    }
                }
                else
                    return this.generateAccessToken(user)
            }
        } 
        catch (error) {
        console.log("error in api request in register user", error);
        throw new BadRequestException(error.response?.statusText);
        }
    }
    
    /** @summary generate and access token for a user to enter website */
    async generateAccessToken(user: any) {
        const payload = {username: user.mail, sub: user.user_id};
        let access_token = this.jwtService.sign(payload)
        console.log("access_token: ", access_token);
        return {
            doubleAuth: false,
            accessToken: access_token,
            user
        };
    }
}
