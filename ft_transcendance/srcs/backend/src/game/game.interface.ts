import { Users } from "src/typeorm";

export interface GameInterface {
    room: string,
    player1: number, // id player1
    player2: number, // id player 2

    posX1: number, // palet user 1 y 
    posX2: number, // palet user 2 y 
    posY1: number, // palet user 1 y 
    posY2: number, // palet user 2 y 

    // heigth and width of paddle of plyer 1 and 2
    heigth1: number,
    heigth2: number,
    width1: number,
    width2: number,

    // variable of the ball
    ballX: number,
    ballY: number,
    velocityX: number,
    velocityY: number,
    bRadius: number,
    speed: number,

    score1: number;
    score2: number;
}