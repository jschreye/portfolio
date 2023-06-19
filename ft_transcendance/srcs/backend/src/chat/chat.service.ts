import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm';
import { Chat } from 'src/typeorm';
import { Message } from 'src/typeorm';
import { Mute } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import * as bcrypt from 'bcrypt';
import { AppGateway } from 'src/app/app.gateway';
import { SocketService } from 'src/socket/socket.service';
import { Socket, Server} from 'socket.io';

@Injectable()
export class ChatService {
   constructor (
     @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
     @InjectRepository(Message) private readonly messRepository: Repository<Message>,
     @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private userService: UsersService,
    private rolesService: RolesService,
    private socketService: SocketService,       
   ) {}

   /** @brief get a chanel according to its id */
    async findOne(chanelId: number) {
    const chan = await this.chatRepository.findOne({
        where: {
            chat_id: chanelId
        }
    })
    return chan;
   }

    async getChannelInfo(chanelId: number) {
    const chan = await this.chatRepository
                        .createQueryBuilder('chat')
                        .leftJoinAndSelect('chat.banned', 'banned')
                        .leftJoinAndSelect('chat.muted', 'muted')
                        .leftJoinAndSelect('muted.users', 'user')
                        .leftJoinAndSelect('chat.admins', 'admins')
                        .leftJoinAndSelect('chat.users', 'users')
                        .leftJoinAndSelect('chat.owner', 'owner')
                        .where('chat.chat_id = :id', {id: chanelId})
                        .getOne()
        //console.log("this is the chanel: ", chan);
        return chan
    }

    /** @brief check if the channel exists (used to know if the name is already used)*/
    async checkChanExist(name: string) {
        let checkExist = await this.chatRepository.createQueryBuilder('chat')
                                    .where('chat.name = :chat_name', {chat_name: name})
                                    .getOne()
        return checkExist;
    }


    /** @brief creates a channel according to the secifications in params with user as owner, , privmsg are also considered as chans */
    async createChanel(user: Users, params: any) {
        console.log('params: ', params)
        if (params.direct == true) // if it is a privmsg
        {
            return this.createDirectMessage(user, params)
        }
        const checkChanExist = await this.checkChanExist(params.name); // check if the name is already taken 
        if (checkChanExist)
        {
            return {
                msg: `Please choose another name channel ${params.name} already exists`,
                chanContext: null,
                isCreated: false
            };
        }
        if (params.private == true) // chanel is private
        {
            return this.createPrivateChan(user, params)
        }
        const newChan = new Chat(); 
        newChan.owner = user;
        newChan.admins = [user];
        newChan.name = params.name;
        newChan.users = [user];
        newChan.nb_users = 1;
        if (params.protected == true)
        {
            const salt = await bcrypt.genSalt();
            newChan.pwd = await bcrypt.hash(params.pwd, salt); // hash chan's pwd
            newChan.isProtected = true;
            const chat = await this.chatRepository.save(newChan)
            const chanContext = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: chat.chat_id})
                                .andWhere('users.user_id = :user_id', {user_id: user.user_id})
                                .andWhere('chanel.isPrivate = :status', {status: false})
                                .getRawOne()
            let server: Server = this.socketService.getServer();
            server.emit('dash', 'refreshdashboard')
            return {
                chanContext,
                isCreated: true,
                msg: `Channel ${params.name} successfuly created!`
            };
        }
        const chat = await this.chatRepository.save(newChan)
        const chanContext = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: chat.chat_id})
                                .andWhere('users.user_id = :user_id', {user_id: user.user_id})
                                .andWhere('chanel.isPrivate = :status', {status: false})
                                .andWhere('chanel.isDirect = :direct', {direct: false})
                                .getRawOne()
        let server: Server = this.socketService.getServer();
        server.emit('dash', 'refreshdashboard')
        return {
            chanContext,
            isCreated: true,
            msg: `Channel ${params.name} successfuly created!`
        };
    }

    /** @brief creates a direct discussion between user and the user corresponding to otherId */
    async createDirectMessage(user: Users, params: any ) {
        const other = await this.userService.findOne(params.otherId);
            let name:string;
            name = user.nickname + '-' + other.nickname;
            let checkExist = await this.checkChanExist(name);
            if (!checkExist)
            {
                name = other.nickname + '-' + user.nickname;
                checkExist = await this.checkChanExist(name);
            }
            if (checkExist)
            {
                const chanContext = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: checkExist.chat_id})
                                .andWhere('users.user_id = :user_id', {user_id: user.user_id})
                                .andWhere('chanel.isPrivate = :status', {status: false})
                                .andWhere('chanel.isDirect = :direct', {direct: true})
                                .getRawOne()
            //console.log( "toreturn: ", toReturn)
                return {
                    chanContext,
                    isCreated: true,
                    msg: `Channel ${name} successfuly joined!`
                };
            }
            const newChan = new Chat();
            //newChan.owner = user;
            //newChan.admins = [user];
            newChan.name = name;
            newChan.isDirect = true;
            newChan.users = [other, user];
            newChan.nb_users = 2;
            const chat = await this.chatRepository.save(newChan)
            const chanContext = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: chat.chat_id})
                                .andWhere('chanel.isDirect = :status', {status: true})
                                .andWhere('users.user_id = :user_id', {user_id: user.user_id})
                                .getRawOne()
        let server: Server = this.socketService.getServer();
        server.emit('dash', 'refreshdashboard');         
        return {
            chanContext,
            isCreated: true,
            msg: `Channel ${name} successfuly created!`
        };
    }

    async createPrivateChan(user: Users, params: any) {
        let array = <number[]>([]);
        array = params.tabUsersId;              // user's ids that the creator wants to invite to its channel

        let users: Users[]
        if (array.length > 0)                   // get the corresponding array of users
        {
            users = await this.userRepository.createQueryBuilder('users')
                                    .where('users.user_id IN (:...array)', {array})
                                    .getMany()
        }
        const newChan = new Chat();
        newChan.owner = user;
        newChan.admins = [user];
        newChan.name = params.name;
        newChan.users = [user];
        newChan.isPrivate = true;
        newChan.nb_users = array.length + 1;
        const Channel = await this.chatRepository.save(newChan)
        if (users)                          
        {
            for (let i = 0; users[i]; i++)  // add users to the array of users in the channel
            {
                await this.chatRepository
                            .createQueryBuilder()
                            .relation(Chat, "users")
                            .of(Channel)
                            .add(users[i])
            }
        }
        const chanContext = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.users', 'users')
                                .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                .where('chanel.chat_id = :chat_id', {chat_id: Channel.chat_id})
                                .andWhere('users.user_id = :user_id', {user_id: user.user_id})
                                .andWhere('chanel.isPrivate = :status', {status: true})
                                .getRawOne()
       // console.log('to return : ', toReturn)
       let server: Server = this.socketService.getServer();
        server.emit('dash', 'refreshdashboard');
        return {
            chanContext,
            isCreated: true,
            msg: `Channel ${params.name} successfuly created!`
        };
    }

    /** @brief deletes the channel (only the ownr can do that) */
    async deleteChan(user: Users, chanelId: number) {
        
        const chan = await this.findOne(chanelId);
        if (!chan)
            return 'No such Channel';
        const owner = await this.rolesService.isOwner(user, chanelId);
        if (owner)
        {
            await this.chatRepository.remove(chan);
            let server: Server = this.socketService.getServer();
            let room = chanelId.toString();
            server.to(room).emit('notifChat', 'deleteChan', `${user.nickname} deleted the channel`);
            return "channel succesfuly removed"
        }
        let server: Server = this.socketService.getServer();
        server.emit('dash', 'refreshdashboard');
        return 'you are not the owner of this channel'
    }

    /** @summary returns all users' chanel devided betwee */
    async getMyChans(user: Users) {

        const privMsg = await this.userRepository  // get all privmsg of the user
                                    .createQueryBuilder('user')
                                    .leftJoinAndSelect('user.chanel', 'chanel')
                                    .leftJoinAndSelect('chanel.users', 'users')
                                    .select(['chanel.name', 'chanel.chat_id', 'users.nickname'])
                                    .where('chanel.isDirect = :status', {status: true})
                                    .andWhere('users.user_id != :users_id', {users_id: user.user_id})
                                    .andWhere('user.user_id = :user_id', {user_id: user.user_id})
                                    .getRawMany()
        
        //console.log("privmsg: ", privMsg);
        const Mychanels = await this.chatRepository         // get all user's chans that are not direct messages
                                    .createQueryBuilder('chanel')
                                    .leftJoinAndSelect('chanel.users', 'users')
                                    .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                    .where('chanel.isDirect = :status', {status: false})
                                    .andWhere('users.user_id = :user_id', {user_id: user.user_id})
                                    .getRawMany()
        
            let chanIds = [];
            for (let i = 0; Mychanels[i]; i++)  // create an array of id's that correspond to the user's channel's ids
            {
                chanIds[i] = Mychanels[i].chanel_chat_id;
            }

            if (chanIds.length < 1) // if the array is empty then query for all channels (non private and non direct mess)
            {
                const chanels = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .where('chanel.isPrivate = :status', {status: false})
                                    .andWhere('chanel.isDirect = :direct_id', {direct_id: false})
                                    .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                    .getRawMany();

                return {
                    privMsg,
                    Mychanels,
                    chanels
                }
            }
            else {
                const chanels = await this.chatRepository        // else exclude the array from the query 
                                        .createQueryBuilder('chanel')
                                        .where('chanel.chat_id NOT IN (:...chanIds)', {chanIds})
                                        .andWhere('chanel.isPrivate = :status', {status: false})
                                        .andWhere('chanel.isDirect = :direct_id', {direct_id: false})
                                        .select(['chanel.name', 'chanel.chat_id', 'chanel.isProtected'])
                                        .getRawMany();
                return {
                    privMsg,
                    Mychanels,
                    chanels
                }
            }                        
    }

    /** @brief get the user's roles in the channel (owner, admin, banned, muted?) */
    async userContext(user: Users, chanelId: number) {
        
        let server: Server = this.socketService.getServer()
        const chan = await this.findOne(chanelId);
        if (!chan)
            return 'No such Channel';
        const banned = await this.rolesService.isBanned(user, chanelId);
        let pwd = false;
        let isProtected = chan.isProtected;
        const muted = await this.rolesService.isMuted(user, chanelId);
        const owner = await this.rolesService.isOwner(user, chanelId);
        const admin = await this.rolesService.isAdmin(user, chanelId);

        const checkUser = await this.rolesService.isInChanel(user, chanelId);
        if (checkUser == true)
            return {
                isProtected,
                banned,
                pwd,
                muted,
                owner,
                admin
            }
        if (chan.isProtected == true)
            pwd = true;
        if (pwd == false && banned == false)
        {
            chan.nb_users += 1;
            const newchan = await this.chatRepository.save(chan);
            const result = await this.chatRepository
                                    .createQueryBuilder()
                                    .relation(Chat, "users")
                                    .of(newchan)
                                    .add(user)
            let room = chan.chat_id.toString();
            if (!server)
                console.log("No server instance")
            else
                server.to(room).emit('notifChat', 'users')      // emit to people in the room that they should refresh users
        }
        return {
            isProtected,
            banned,
            pwd,
            muted,
            owner,
            admin
        }
    }

    async leaveChanel(user: Users, chanelId: number) {
        const isInChan = await this.rolesService.isInChanel(user, chanelId)
        if (!isInChan)
            return `${user.nickname} is not part of this channel`;

        const chan = await this.chatRepository.createQueryBuilder('chat')
                                    .leftJoinAndSelect('chat.users', 'users')
                                    .where('chat.chat_id = :chat_id', {chat_id: chanelId})
                                    .getOne()
        if (chan.nb_users < 2)
        {
            let server: Server = this.socketService.getServer();
            server.emit('dash', 'refreshdashboard');
            await this.chatRepository.remove(chan);
            return `${chan.name} has been deleted`;
        }
        if (chan.isDirect == true && chan.nb_users < 3)
        {
            await this.chatRepository.remove(chan);
            let server: Server = this.socketService.getServer();
            let room = chanelId.toString();
            server.to(room).emit('notifChat', 'privContext', `${user.nickname} left the channel`);
            server.emit('dash', 'refreshdashboard')
            return `${chan.name} has been deleted`;
        }
        chan.nb_users--;
        if ((await this.rolesService.isOwner(user, chanelId)) == true)
        {
            chan.owner = null;
        }
        let newChan = await this.chatRepository.save(chan);
        if ((await this.rolesService.isAdmin(user, chanelId)) == true)
        {
            await this.chatRepository
            .createQueryBuilder()
            .relation(Chat, "admins")
            .of(newChan)
            .remove(user)
        }
        await this.chatRepository
            .createQueryBuilder()
            .relation(Chat, "users")
            .of(newChan)
            .remove(user)

        let server: Server = this.socketService.getServer();
        let room = newChan.chat_id.toString();
        let socket = this.socketService.getSocket(user.user_id);
        if (socket)
            socket.leave(room);
        server.to(room).emit('notifChat', 'users')
        const result = await this.getChannelInfo(chanelId)
        const newUserChan = await this.getMyChans(user);
    }

    
    async toKick(user: Users, toBeKicked: number, chanelId: number) {
        const toKick = await this.userService.findOne(toBeKicked);
        const checkKick = await this.rolesService.isInChanel(toKick, chanelId);
        if (!checkKick)
            return {
                message: `${toKick.nickname} is not in Channel`,
                kick: false
            }
            
        const isAdmin = await this.rolesService.isAdmin(user, chanelId);
        if (isAdmin == false)
            return{
                message: `You cannot kick ${toKick.nickname}, you are not Admin of this Chanel`,
                kick: false
            } 
        
        const isOwner = await this.rolesService.isOwner(toKick, chanelId);
        if (isOwner == true)
        return{
            message: `You cannot kick ${toKick.nickname}, they are the owner of the channel`,
            kick: false
        } 
        await this.leaveChanel(toKick, chanelId);
        let server: Server = this.socketService.getServer()
        let socket = this.socketService.getSocketID(toKick.user_id);
        server.to(socket).emit('notifChat', 'userContext');
        return {
            message: `You successfully kicked ${toKick.nickname}`,
            kick: true
        }
    }

    async toBan(user: Users, toBeBanned: number, chanelId: number) {
        const toBan = await this.userService.findOne(toBeBanned);
        const checkBan = await this.rolesService.isBanned(toBan, chanelId);
        if (checkBan == true)
            return {
                message: `${toBan.nickname} is already banned`,
                ban: false
            }

        const isAdmin = await this.rolesService.isAdmin(user, chanelId);
        if (isAdmin == false)
        return {
            message: `You cannot ban ${toBan.nickname}, you are not Admin of this Chanel`,
            ban: false
        }
        
        const isOwner = await this.rolesService.isOwner(toBan, chanelId);
        if (isOwner == true)
        return {
            message: `You cannot ban ${toBan.nickname}, they are the owner of the channel`,
            ban: false
        }
        await this.leaveChanel(toBan, chanelId);
        const chan = await this.findOne(chanelId);
        const result = await this.chatRepository
                                    .createQueryBuilder()
                                    .relation(Chat, "banned")
                                    .of(chan)
                                    .add(toBan)
            
        //let room = chan.chat_id.toString();
        //let server: Server = this.socketService.getServer()
        //server.to(room).emit('notifChat', 'userContext')
        let server: Server = this.socketService.getServer()
        let socket = this.socketService.getSocketID(toBan.user_id);
        server.to(socket).emit('notifChat', 'userContext')
            return {
            message: `You successfully banned ${toBan.nickname}`,
            ban: false
        }
    }


    async getChanHistory(user: Users, chanelId: number) {
        const isChan = this.rolesService.isInChanel(user, chanelId);
        if (!isChan)
            return "Please join the channel to see its history";
        const chan = await this.rolesService.getBlocked(user)
        let blocked = [];
        for (let i = 0; chan[i] &&  chan[i].blocked_user_id != null; i++) {
            blocked[i] = chan[i].blocked_user_id;
        }

        let history: any[];
        if (blocked.length > 0) // if the users blocked other users
        {
            history = await this.chatRepository
                                .createQueryBuilder('chanel')
                                .leftJoinAndSelect('chanel.messages', 'messages')
                                .leftJoinAndSelect('messages.sender', 'sender')
                                .where('chanel.chat_id = :id', {id: chanelId})
                                .andWhere('sender.user_id NOT IN (:...blocked)', {blocked})
                                .select(['messages.text', 'messages.createdAtTime','sender.user_id', 'sender.nickname'])
                                .getRawMany()

        }
        else {
            history = await this.chatRepository
                                    .createQueryBuilder('chanel')
                                    .leftJoinAndSelect('chanel.messages', 'messages')
                                    .leftJoinAndSelect('messages.sender', 'sender')
                                    .where('chanel.chat_id = :id', {id: chanelId})
                                    .select(['messages.text', 'messages.createdAtTime','sender.user_id', 'sender.nickname'])
                                    .getRawMany()
        }
        if (history.length > 1)
        {
            for (let i = 0; history[i]; i++)
            {
                let time = history[i].messages_createdAtTime;
                history[i].messages_createdAtTime = time.getHours() + ':' + time.getMinutes();
            }
        }
        return {
            history
        }
    }

    /** @summary save a new message in the database and return the record*/
    async newMessage(user: Users, chanelId: number, text: string) : Promise<Message> {
        const isMuted = await this.rolesService.isMuted(user, chanelId);
        if (isMuted == true)
            return null
        const chanel = await this.chatRepository.findOne({
            where: {
                chat_id: chanelId
            }
        })
        if (!chanel)
            return null;
        const Mess = new Message();
        Mess.chanel = chanel;
        Mess.sender = user;
        Mess.text = text;
        const newMess = await this.messRepository.save(Mess);
        const returnMess = await this.chatRepository
                                        .createQueryBuilder('chanel')
                                        .leftJoinAndSelect('chanel.messages', 'messages')
                                        .leftJoinAndSelect('messages.sender', 'sender')
                                        .where('chanel.chat_id = :id', {id: chanelId})
                                        .andWhere('messages.mess_id = :mess_id', {mess_id: newMess.mess_id})
                                        .select(['messages.text', 'messages.createdAtTime','sender.user_id', 'sender.nickname'])
                                        .getRawOne() 

        let time = returnMess.messages_createdAtTime;
        returnMess.messages_createdAtTime = time.getHours() + ':' + time.getMinutes();
        return returnMess;
    }

    async checkChanPwd(user: Users, chanelId: number, pwd: string) {
        const chanel = await this.findOne(chanelId);
        const isInChan = await this.rolesService.isInChanel(user, chanelId)
        const isMatch = await bcrypt.compare(pwd, chanel.pwd)
        if (isMatch)
        {
            if (isInChan)
                return `you are in ${chanel.name}`;
            chanel.nb_users += 1;
            const newchan = await this.chatRepository.save(chanel);
            await this.chatRepository 
                        .createQueryBuilder()
                        .relation(Chat, "users")
                        .of(newchan)
                        .add(user)
            return true;
        }
        else
            return false;
    }

    /** @summary changes a channel's pwd, if pwd.length is 0 then the channel becomes public*/
    async changePwd(user: Users, ChanelId: number, pwd: string)
    {
        const chan = await this.findOne(ChanelId);
        const isOwner = await this.rolesService.isOwner(user, ChanelId);
        if (!isOwner)
            return "You cannot change the password of the channel you are not the owner";
        if (pwd.length < 1)
        {
            chan.isProtected = false
            await this.chatRepository.save(chan);
            return `channel ${chan.name} is now public`;    
        }
        else
        {
            chan.isProtected = true;
            const salt = await bcrypt.genSalt();
            chan.pwd = await bcrypt.hash(pwd, salt); // hash chan's pwd
            //chan.pwd = pwd;
            await this.chatRepository.save(chan);
            return `password of channel ${chan.name} succesfuly changed`;
        }
    }
}


