import { Controller, Post, Response, Request, Get, Param, Delete, Put} from '@nestjs/common';
import { ChatService } from './chat.service';
import { RolesService } from './roles.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService,
                private rolesService: RolesService) {}

    @Post('create')
    async createChannel (@Request() req: any) {
       return await this.chatService.createChanel(req.user, req.body);
    }

    @Get('all')
    async getAll(@Request() req: any) {
        return await this.chatService.getMyChans(req.user);
    }

    @Get('join/:id')
    async getChan(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.chatService.userContext(req.user, id));  
    }

    /** @summary */
    @Get('update/:id')
    async updateChat(@Param('id') id: number, @Request() req: any) {
        let isBanned = await this.rolesService.isBanned(req.user, id);
        if (isBanned == true)
        {
            return {
                isBanned,
                isKicked: false, 
                userContext: null
             }
        }
        let isKicked = await this.rolesService.isInChanel(req.user, id)
        if (isKicked == false)
        {
            isKicked = true;
            return {
                isKicked, 
                isBanned: false,
                userContext: null
             }
        }
        const userContext = await this.chatService.userContext(req.user, id);
        return {
            isKicked: false,
            isBanned: false,
            userContext }
    }

    /** @summary check if the code is correct to enter on a protected chan */
    @Post('code')
    async checkCodeChan(@Request() req: any)
    {
        return await this.chatService.checkChanPwd(req.user, req.body.chanId, req.body.checkCode);
    }

  
    /** @summary changes the pwd of the channel (owner privilege) */
    @Post('pwd')
    async pwdChan(@Request() req: any)
    {
        return await this.chatService.changePwd(req.user, req.body.chanelId, req.body.pwd)
    }

    /** @summary deletes the channel (owner privilege) */
    @Delete('del/:id')
    async delChan(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }

        return res.status(200).json(await this.chatService.deleteChan(req.user, id)); 
    }

    /** @summary user is leaves the channel (removed from users list of the channel) */
    @Post('quit')
    async quitChan(@Request() req: any) {
        await this.chatService.leaveChanel(req.user, req.body.chanelId)
        return await this.chatService.getMyChans(req.user);
    }

    @Get('history/:id')
    async getHistory(@Param('id') id: any, @Request() req: any, @Response() res: any) {

        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.chatService.getChanHistory(req.user, id));  
    }


    @Post('message/:id')
    async createMess(@Param('id') id: any, @Request() req: any, @Response() res: any) {

        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.chatService.newMessage(req.user, id, req.body.text));  
        //return await this.chatService.newMessage(req.user, id, req.body.text);
    }


    @Get('users/:id')
    async getAllUsers(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        //console.log('req.body: ')
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        //return await this.rolesService.getAllUsers(req.user, id);
        return res.status(200).json(await this.rolesService.getAllUsers(req.user, id))
    }

    @Post('kick')
    async kickUser(@Request() req: any) {
        return await this.chatService.toKick(req.user, req.body.otherId, req.body.chanelId)
    }

    @Post('bann')
    async banUser(@Request() req: any) {
        return await this.chatService.toBan(req.user, req.body.otherId, req.body.chanelId)
    }

    @Post('mute')
    async muteUser(@Request() req: any) {
        return await this.rolesService.toMute(req.user, req.body.otherId, req.body.chanelId);
    }

    @Get('isMuted/:id')
    async getMuted(@Param('id') id: any, @Request() req: any, @Response() res: any) {
        if (id === undefined) {
            return res.status(400).json({ message: `id in ${req.baseUrl} is undefined` });
        }
        return res.status(200).json(await this.rolesService.isMuted(req.user, id))
    }

    @Post('admin')
    async adminUser(@Request() req: any) {
        return await this.rolesService.toAdmin(req.user, req.body.otherId, req.body.chanelId)
    }

    @Post('block')
    async blockUser(@Request() req: any) {
        return this.rolesService.blockUser(req.user, req.body.otherId);
    }

    @Get('blocked')
    async getMyblocked(@Request() req: any) {
        return await this.rolesService.getBlocked(req.user)
    }

}
