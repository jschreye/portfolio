import { Body, Controller, Delete, Get, Injectable, Param, Post, Query, Request, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Public } from 'src/public';
import { UsersService } from './users.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@Controller('users')
export class UserController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    async getMySelf(@Request() req: any) {
        return await this.usersService.mySelf(req.user.user_id);
    }

    @Get('avatar/:id')
    async getAllUsers(@Param('id') id: number, @Res({passthrough: true}) res: Response)
    {
        
        const user = await this.usersService.findOne(id);
        const imageLocation = join(process.cwd(), 'uploads/avatars', user.avatar);
        const file = createReadStream(imageLocation);

        const expires = new Date(Date.now() + 86400000).toUTCString();
        const pragma = 'no-cache';
        res.set({
                    'Content-Type': 'image/jpeg',
                    'Cache-Control': 'no-cache',
                    'Expires': expires,
                    'Pragma': pragma
                });
        return new StreamableFile(file);
    }

    @Get('profile/:id') 
    async getProfile (@Param('id') id: number){
        return await this.usersService.returnProfile(id);
    }

    @Get('all') 
    async getAllProfile (@Request() req: any) {
        return await this.usersService.findAll(req.user);
    }


    @Post('friend-request')
    async friendRequest(@Request() req: any) {
        return await this.usersService.friendRequest(req.user, req.body.id)
    }

    @Post('friend-accept')
    async acceptFriends(@Request() req: any) {
        if (req.body.decision == true)
            return await this.usersService.acceptFriendRequest(req.user, req.body.id)
        else if (req.body.decision == false)
            return await this.usersService.rejectFriendRequest(req.user, req.body.id);
    }

    @Post('delete-friend')
    async deleteFriend(@Request() req: any) {
        return this.usersService.stopFrienship(req.user, req.body.id);
    }

    @Post('doubleAuth')
    async modifyDoubleAuth(@Request() req: any) {
        return await this.usersService.doubleAuth(req.user, req.body.doubleAuth);
    }

    @Get('match-history/:id')
    async getMatchHistory(@Request() req: any, @Param('id') id: number) {
        return await this.usersService.returnMatch(id)
    }

}