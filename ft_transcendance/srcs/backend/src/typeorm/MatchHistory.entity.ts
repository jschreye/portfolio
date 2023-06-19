import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm"
import { Users } from "./Users.entity";

@Entity() 
export class MatchHistory { 

    @PrimaryGeneratedColumn()
    match_id: number

    @ManyToOne((type) => Users)
    @JoinColumn()
    player1: Users;

    @ManyToOne((type) => Users)
    @JoinColumn()
    player2: Users;
    /*@Column()
    player1: string*/

    /*@Column()
    player2: string*/


    @Column()
    score: string;

    @CreateDateColumn({
        type: 'timestamptz'
    })
    date: Date;

}