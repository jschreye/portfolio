import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { authenticator } from "otplib";
import { Users } from "src/typeorm";
import { UsersService } from "src/users/users.service";
import { toFileStream } from 'qrcode';
import { Response } from "express";

@Injectable()
export class TwoFactorAuthenticationService {
    constructor (
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {}

    async generateTwoFactSecret(user: Users) {
        const secret = authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(user.email, 
            this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
        await this.usersService.setTwoFact(secret, user.user_id);

        return {
            secret, 
            otpauthUrl
        }
    }

    async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
    }

    isTwoFactorAuthenticationCodeValid(twoFactCode: string, user: Users) {
        return authenticator.verify({
            token: twoFactCode,
            secret: user.twoFactorAuthenticationSecret
        })
    }
}