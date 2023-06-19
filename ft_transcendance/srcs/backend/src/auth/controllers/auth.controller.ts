import { Controller, Get, Request, Post, UseGuards, Body, ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/public';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private profileService: ProfileService,
        private jwtService: JwtService,
        private readonly httpService: HttpService,) {}


    /** @summary the code given by the 42 API is retrieved by the front in the redirect URL, combined with the secret the API gives an acces_token */
    @Post('wellcome')
    async helloFriend( @Body() body: any) {
    console.log(body.code)
    const {data} = await firstValueFrom(this.httpService.post(`https://api.intra.42.fr/oauth/token`, {
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: body.code,
            redirect_uri: process.env.REDIRECT_URI,
        }).pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error has happened! ' 
          })
        )
      )
    return this.authService.registerUser(data.access_token);
  }

}
