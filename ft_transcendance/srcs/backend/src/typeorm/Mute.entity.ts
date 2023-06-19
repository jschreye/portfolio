import { Column, Entity, CreateDateColumn, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Chat } from "./Chat.entity";
import { Users } from "./Users.entity";

@Entity()
export class Mute {
    @PrimaryGeneratedColumn( {
        type: 'bigint',
        name: 'mute_id'
    })
    mute_id: number

    @ManyToOne((type) => Users)
    @JoinColumn()
    users: Users

    @ManyToOne(() => Chat, (chat) => chat.muted, {onDelete: 'CASCADE'})
    chat: Chat

    @CreateDateColumn({
    })
    createdAt: Date;
}