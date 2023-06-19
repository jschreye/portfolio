
import {
  WebSocketGateway,
WebSocketServer,
SubscribeMessage,
OnGatewayConnection,
OnGatewayDisconnect,
OnGatewayInit,
} from '@nestjs/websockets'
import { Socket, Server} from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { GameService } from 'src/game/game.service';
import { UsersService } from 'src/users/users.service';
import { Interval } from '@nestjs/schedule'
import { Users } from 'src/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SocketService } from 'src/socket/socket.service';
import { ConfigService } from '@nestjs/config';

// allow us to make use of the socket.io functionality
@WebSocketGateway({     
  path: "/api/socket.io",
  cors: {
      origin: '*',
  },
}) 

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private usersService: UsersService,
              private chatService: ChatService, 
              private gameService: GameService,
              private jwtService: JwtService,
              private socketService: SocketService,
              private configService: ConfigService) {}
              
  @WebSocketServer() server: Server;   
  
  /** @summary function called right after initialization */
  afterInit(server: any) {                  // initialize the server instance in the socketService to be able to use it else where
    this.socketService.setServer(server);
  }

  rooms: string[] = [];                     // number of rooms for the game that are active (emit on the every x time to update positions)
  invite: {                                 // an array of invite accepted containing the room name and IDs, used to attribute a room to the players in startgame
    user1: number,
    user2: number,
    room: string
  } []

  async handleConnection(client: Socket, ...args: any[]) {
    
    if (!this.invite) // init invite
          this.invite = [];
    let token = client.handshake.auth.token;
      if (!token)
        client.disconnect()
      let userToken = this.jwtService.verify(
        token, {
          secret: this.configService.get('APP_SECRET')
        }
      );
      let user = await this.usersService.findOne(userToken.sub)
      if (!user) // if no user in database with user_id (extracted from token) disconnect socket
        client.disconnect()
      else
      {
        let connected = this.socketService.getSocketID(user.user_id);
        console.log(`${user.nickname} is in connection`)
        if (connected == null)
        {
          console.log("je suis dans connect nulll")
          console.log(`${user.nickname}`)
          this.socketService.setUser(client, user.user_id);
        }
        else {
          console.log(`${user.nickname} Ma chaussette a ete remplcéeeeeee`);
          this.socketService.removeUser(connected);
          this.socketService.setUser(client, user.user_id);
        }
        await this.usersService.isActive(user, 1);
      }
    }
  
    async handleDisconnect(client: Socket) {
      const user = await this.socketService.getUser(client.id);
      const user1 = await this.usersService.isActive(user, 0); // the user is not any more active
      this.socketService.removeUser(client.id); // delete the socket from the lists of active users
      let game = this.gameService.findPlayerInGame(user.user_id);
      console.log(`${user.nickname} a perdu ses chaussettes`);
      if (game != null)
      {
        console.log("I was in a gammeeeee");
        console.log(game);
        const winner = await this.gameService.gameStats(game);
        this.gameService.stopGame(game.room);
        this.server.to(client.id).emit('startgame', -1, false, true, 'You left the game');
        let msg = `${user.nickname} a perdu ses chaussettes.`
        client.broadcast.to(game.room).emit('startgame', -1, winner, true, msg); // message to the other user
        this.server.in(game.room).socketsLeave(game.room);
        for (let i = 0; this.rooms[i]; i++)
        {
          if (this.rooms[i] == game.room)
          {  
            this.rooms.splice(i, 1);
          }
        }
      }
      if (this.gameService.deleteMatch(user.user_id))
      {
        let room = 'room' + user.user_id;
        this.server.in(room).socketsLeave(room);
        for (let i = 0; this.rooms[i]; i++)
        {
          if (this.rooms[i] == room)
            this.rooms.splice(i, 1);
        }
      }
    }
  
    @SubscribeMessage('join')   // used to listening to incoming messages.
    async joinChat(client: Socket, payload: string) { // client (reference to a socket), message( data from client)

      const user = await this.socketService.getUser(client.id);
      client.join(payload);
      let message = user.nickname + " just joined the channel: ";
      this.server.to(payload).emit('join', message)
    }

    @SubscribeMessage('chat')
    async sendMess(client: Socket, payload: string) {

      const user = await this.socketService.getUser(client.id);
      let channelId = +payload[1];
      const newMess = await this.chatService.newMessage(user, channelId, payload[0])
      if ( newMess != null)     // if the user is not muted 
        this.server.to(payload[1]).emit('chat', newMess)    // emit to every one in the chat room
    }


    /** @brief emits on the room to give update to the players about the game */
    @Interval(1000/50)
    async handleInterval() {
        if (this.rooms.length > 0)
        {
          for(let i = 0; this.rooms[i]; i++)
          {
            let room = await this.gameService.findGame(this.rooms[i]);
            if (!room)
              return ;
            else 
            {
              if (room.score1 >= 10 || room.score2 >= 10)
              {
                const game = this.gameService.findGame(room.room)
                this.gameService.stopGame(room.room);
                const winner = await this.gameService.gameStats(game);
                this.server.to(this.rooms[i]).emit('startgame', -1, winner, true, 'game finished');
                this.server.in(this.rooms[i]).socketsLeave(this.rooms[i])
                this.rooms.splice(i, 1)
                this.server.in(room.room).socketsLeave(room.room)
              }
              else
                this.server.to(this.rooms[i]).emit('game', room.ballX, room.ballY, room.posY1, room.posY2, room.score1, room.score2)
            }
          }
        }
    }
    

    /** @brief connects to clients to room (matchmaking, invitation) and initiate the game when the two players are in the room */
    @SubscribeMessage('startgame')
    async startGame(client: Socket, payload: any) { 
      const user = await this.socketService.getUser(client.id);
      let room: string
      if (payload[0] === false) // if it is a game from an invite 
      {
        const other = await this.usersService.findNickname(payload[1])
        for (let i = 0; this.invite[i]; i++) // find the corresponding room in the list of invites
        {
          console.log("INVITE:", this.invite[i])
          if (this.invite[i].user1 == user.user_id && this.invite[i].user2 == other.user_id)
          {
            room = this.invite[i].room
          }
          else if (this.invite[i].user2 == user.user_id && this.invite[i].user1 == other.user_id){
            room = this.invite[i].room
          }
        }
      }
      else if (payload[0] === true) // if it from matchmaking
      {
        await this.gameService.addToList(user.user_id); // add to list matchmaking
        room = await this.gameService.matchMaking(user.user_id); // gives a room
        console.log(room);
      }

      client.join(room); // add the player to the room
      var numberUser = await this.server.in(room).fetchSockets() // depending on the number of clients in room the game starts or not
      if (numberUser.length == 1) // if only one is present then his id as player is sent
      {
        this.server.to(client.id).emit('startgame', 1, false, false);
        await this.usersService.isActive(user, 2);
      }
      else if (numberUser.length == 2)
      {
        this.server.to(client.id).emit('startgame', 2, false, false); // send player id to the seccond player
        if (payload[0] == false)                                // if from invite
        {
          for (let i = 0; this.invite[i]; i++)
          {
            if (this.invite[i].room == room)
            {
              if (this.invite[i].user1 == user.user_id)
              {
                this.gameService.newGame(room, this.invite[i].user2, this.invite[i].user1) // if it is from invite add the game to the game list
              }
              else
              {
                this.gameService.newGame(room, this.invite[i].user1, this.invite[i].user2);
              }
              this.invite.splice(i, 1);
              break;
            }
          }
        }
        let newGame = this.gameService.findGame(room);
        const user2 = await this.usersService.findOne(newGame.player1);
        this.server.to(room).emit('otherNick', user.nickname, user2.nickname);
        this.server.to(room).emit('startgame', room, true, false); // emit to start the game
        await this.usersService.isActive(user, 2);
        this.rooms.push(room);
      }
    }

    /** @summary initialize the postion of the ball and the player's pads */
    @SubscribeMessage('init') 
    initPlay(client: Socket) {
      this.server.to(client.id).emit('init', 300, 200, 150, 150) // emit: ballX, ballY, y palyer1, y player2
    }

    /** @summary recieves infos about the position of the paddle of each player and updates the values in the game object */
    @SubscribeMessage('player')
    async palyerPos(client: Socket, payload: string) {
      const user = await this.socketService.getUser(client.id);
      let pos = +payload[1];
      this.gameService.updatePlayerPos(payload[0], user.user_id, pos)
    }

    /** @summary */
    /** used by the server to emit the positions of each element in the game needed by the clients to render
     * communicates the end of the game as well
     * used by the client to communicate to the server if it wants to quit the game
     */
    @SubscribeMessage('game')
    async gameInfo(client: Socket, payload: any) {
      const user = await this.socketService.getUser(client.id);
      if (payload[1] == 'quit') // when quitting payload[0] = the room and payload[1] = key word 'quit'
      {
        if (!payload[0]) // meaning the match did not start yet 
        {
          if (payload[2]) {     // it from an invite
            const other = await this.usersService.findNickname(payload[2])
            let otherSockID = this.socketService.getSocketID(other.user_id);
            this.server.to(otherSockID).emit('notif', user.nickname, 'quit');
            this.server.to(client.id).emit('startgame', -1, false, true, 'You left the game');
            for (let i = 0; this.invite[i]; i++) // find the corresponding room in the list of invites
            {
              for (let i = 0; this.invite[i]; i++) // find the corresponding room in the list of invites
              {
                if (this.invite[i].user1 == user.user_id && this.invite[i].user2 == other.user_id)
                {
                  this.invite.splice(i, 1);
                }
                else if (this.invite[i].user2 == user.user_id && this.invite[i].user1 == other.user_id){
                  this.invite.splice(i, 1);
                }
              }
            }
            await this.usersService.isActive(user, 1);
          }
          else {
            this.gameService.deleteMatch(user.user_id);
            this.server.to(client.id).emit('startgame', -1, false, true, 'You left the game');
            let room = 'room' + user.user_id;
            for (let i = 0; this.rooms[i]; i++)
            {
              if (this.rooms[i] == room)
                this.rooms.splice(i, 1);
            }
            await this.usersService.isActive(user, 1);
          }
        }
        else { // the game already started
          const message = user.nickname + 'left the game'; 
          const game = this.gameService.findGame(payload[0]);
          if (game != null)
          {
            if (game.player1 == user.user_id)
              game.score2 = 10;
            else
              game.score1 = 10;
            this.gameService.stopGame(payload[0]);
            const winner = await this.gameService.gameStats(game);
            this.server.to(client.id).emit('startgame', -1, winner, true, 'You left the game'); // mess to the one that quit
            client.broadcast.to(payload[0]).emit('startgame', -1, winner, true, message); // message to the other user
            for (let i = 0; this.rooms[i]; i++)
            {
              if (this.rooms[i] == payload[0])
                this.rooms.splice(i, 1);
            }
          }
        }
        this.server.in(payload[0]).socketsLeave(payload[0]);
      }
    }

    /** @summary event used to send notifications about an invitation to play */
    /** emit 1: mess is the user's nickname, 2: an invite or response, 3: */
    @SubscribeMessage('notif') 
    async invitePlay(client: Socket, payload: any) {
      const user = await this.socketService.getUser(client.id);
      let mess: string
      mess = user.nickname;
      if (payload[1] == 'invite') // if payload 1 is true it is an invite to play to user_id payload[0]
      {
        const other = await this.usersService.findOne(payload[0]);
        if (other.isActive == 2 || other.isActive == 0)
        {
          mess = other.nickname;
          this.server.to(client.id).emit('notif', mess, 'offLine');
        }
        else
        {
          let roomID = this.socketService.getSocketID(other.user_id);
          this.server.to(roomID).emit('notif', mess, 'invite')
        }
      }
      else if (payload[1] == 'reponse') // else it is the response to an invite
      {
        const other = await this.usersService.findNickname(payload[0]);
        let otherSocketId = this.socketService.getSocketID(other.user_id);
        if (payload[2] == 'positif') // if the response is positive
        {
          const other = await this.usersService.findNickname(payload[0])
          let name = 'invite-' + user.user_id + '-' + other.user_id; // create the room name and add it to the list of invite
          this.invite.push({
            user1: user.user_id,
            user2: other.user_id,
            room: name
          })
          this.server.to(otherSocketId).emit('notif', user.nickname, 'accepted');
        }
        else if (payload[2] == 'negatif')
        {
          this.server.to(otherSocketId).emit('notif', user.nickname, 'refused');
        }
      }
    }
    
    @SubscribeMessage('dash')
    async dashBoard(client: Socket, payload: string) {
      console.log("dash subscribeMess");
    }
}
