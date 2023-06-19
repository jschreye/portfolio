import { Body, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/public';
import { pathToFileURL } from 'url';
import { ProfileService } from './profile.service';
import path = require('path')
import { PrimaryColumnCannotBeNullableError } from 'typeorm';
import { AuthService } from 'src/auth/services/auth.service';


export const storage = {
    storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, avtar, cb) => {
            const filename: string = path.parse(avtar.originalname).name.replace(/\s/g, '');
            const extension: string = path.parse(avtar.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })
}

@Controller('profile')
export class ProfileController {

    constructor (private readonly profileService: ProfileService ){}

    @Post('modify/nickname')
    async modifyNickanme(@Request()req: any) {
        return await this.profileService.modifyNickname(req.body.nickname, req.user);
    }

    @Post('modify/avatar')
    @UseInterceptors(FileInterceptor('avatar', storage))
    async modifyAvatar(@Request()req: any, @UploadedFile() avatar: Express.Multer.File) {
        return await this.profileService.modifyAvatar(avatar.filename, req.user);
    }
}
