import { Injectable } from '@nestjs/common';
import { Stats, Users } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { config } from 'process'; 
import { AuthService } from 'src/auth/services/auth.service';
import { Observable } from 'rxjs';
import { urlencoded } from 'express';

@Injectable()
export class ProfileService {

    constructor (
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Stats) private statsRepository: Repository<Stats>
    ) {}

    // checks if the user already loggedin once, else create a profile with default 
    // pic and login as nickname
    async createProfile(data: any)
    {
            const newUser = await this.usersRepository.create({login: data.login, email: data.email, avatar: 'super.png'});
            await this.usersRepository.save(newUser);
            const user = await this.usersRepository.findOne ({
                where: {
                    login : data.login
                }
            })
            user.nickname = 'user' + user.user_id;
            user.doubleAuth = false;
            user.isActive = 0; 
            const userSave = await this.usersRepository.save(user);

            const stat = new Stats()
            stat.user = userSave;
            await this.statsRepository.save(stat);
            return user;
    }
    

    async modifyNickname(nickname: string, user: Users) 
    {
        const other = await this.usersRepository.findOne({
            where: { 
                nickname: nickname
            }
        })
        if (!other)
        {
            try {
                user.nickname = nickname;
                await this.usersRepository.save(user);

            }
            catch (error) { 
                console.log("error: ", error)
            }
            return "Your nickname is changed"
        }
        return {
            status:  418,
            message: "Nickname already taken" };
    }

    async modifyAvatar(avatar: string, user: Users)
    {
        user.avatar = avatar;
        await this.usersRepository.save(user);
        return "Your avatar is changed"
    }
}
