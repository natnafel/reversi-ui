import {User} from '../shared/user'

export interface Move{
    id:number;
    row:number;
    col:number;
    player: User
}