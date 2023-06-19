import { Column, Entity, ManyToOne,PrimaryGeneratedColumn} from "typeorm"
import { Users } from "./Users.entity";

@Entity()
export class Friends {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'friend_request',
    })
    friends_id: number;
    // the user'id of the one that requested
    @ManyToOne((type) => Users, user => user.friends)
    friend_one: Users;

    // the usser's id of the one that recieved the request
    @Column()
    friend_two: number;

    // the status of the friend request (false = pending, true = accepted)
    @Column('boolean', {default: false})
    status: boolean = false;

}