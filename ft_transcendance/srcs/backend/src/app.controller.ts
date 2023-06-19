import { Controller, Post,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './public';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { AuthService } from './auth/services/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService
    )  {}

}
