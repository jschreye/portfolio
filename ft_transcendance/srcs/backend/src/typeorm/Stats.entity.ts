import { Column, Entity, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class Stats {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'stats_id',
    })
    stats_it: number;

    @OneToOne(() => Users, (user) => user.stats, {onDelete: 'CASCADE'})
    user: Users;

    @Column({default: 0})
    games: number;

    @Column({default: 0})
    victories: number;

    @Column({default: 0})
    defeats: number;
}