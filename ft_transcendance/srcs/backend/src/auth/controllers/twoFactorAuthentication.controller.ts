import {
    ClassSerializerInterceptor,
    Controller,
    Header,
    Post, 
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    Body,
    UnauthorizedException,
}   from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/typeorm';
import { TwoFactorAuthenticationService } from '../services/twoFactorAuthentication.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../services/auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
    constructor(
        private readonly twoFactorAuthenticationService : TwoFactorAuthenticationService,
        private readonly usersService: UsersService,
        private readonly authservice: AuthService,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ) {}
    
    /** @summary used to authenticate if 2fa is enabled */
    @Post('authenticate')
    async authenticate(@Req() req: any) {
        const user = await this.userRepository.findOne({
            where: {
                nickname: req.body.nickname
            }
        })
        const isValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(req.body.code, user);
        if (!isValid) {
            throw new UnauthorizedException("Wrong authentication code");
        }
        return this.authservice.generateAccessToken(user);
    }

    /** @summary generate the QRcode (used by the user to enable doubleAuth in Google authenticator) */
    @Post('generate')
    async register(@Res() response: Response, @Req() request: any)
    {
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactSecret(request.user);
        return await this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }

    /** @summary changes the state of the double Auth in the database (only if the code is valid) */
    @Post('change')
    async turnOnTwoFactorAuth( @Req() req: any) {
        if (req.body.doubleAuth == false)
        {
            await this.usersService.doubleAuth(req.user, req.body.doubleAuth);
            return {
                message: "Double authentication successfully deactivated",
                doubleAuth: req.body.doubleAuth
            }
        }
        const isValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(req.body.code, req.user);
        if (!isValid) 
            return {
                message: "Wrong authentication code",
                doubleAuth: req.user.doubleAuth
            }
        await this.usersService.doubleAuth(req.user, req.body.doubleAuth);
        return {
            message: "Double authentication successfully activated",
            doubleAuth: req.body.doubleAuth
        }
    }

}
