import { Injectable, NestMiddleware, Next, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "./users/users.service";

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware{
   constructor(
      private jwtService: JwtService,
      private usersService: UsersService,
      private configService: ConfigService
   ){}  
   async use(req: Request, res: Response, next: NextFunction){
      
      let token = req.headers.authorization;                         // extract the token from request header
      let cleanToken = token.replace('Bearer','').trim();            // get only the token (without Bearer)
      if (!token || token == undefined)                              
      {
         throw new UnauthorizedException("No token or undefined token");
      }
      let userToken = this.jwtService.verify(                        // verify the validity of the token
         cleanToken, {
           secret: this.configService.get('APP_SECRET')
         }
       );
      let user = await this.usersService.findOne(userToken.sub)      // get corresponding user
      if (!user)
         throw new UnauthorizedException;                            
      req.user = user;

      // check the content of the req.body to check if undefined variables are present
      const bodyFields = [];
      for (const field in req.body) // field 
      {
         if (req.body.hasOwnProperty(field) && req.body[field] === undefined) {
            bodyFields.push(field);
         }
      }
      if (bodyFields.length > 0) { // if there are undefined files in the body the request will not be proceeded
         return res.status(400).json({ message: `Missing fields: ${bodyFields.join(', ')}` });
      }
      next(); 
   }
}