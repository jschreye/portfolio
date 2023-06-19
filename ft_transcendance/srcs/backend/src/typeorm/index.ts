import { Friends } from "./Friends.entity";
import { Users } from "./Users.entity";
import { Chat } from "./Chat.entity";
import { Message } from "./Message.entity";
import { Stats } from "./Stats.entity";
import { Mute } from "./Mute.entity";
import { MatchHistory } from "./MatchHistory.entity";

const entities = [Users, Friends, Chat, Message, Stats, Mute, MatchHistory];


export {Users, Friends, Chat, Message, Stats, Mute, MatchHistory};
export default entities;