import {User} from '../shared/user'
export interface GameResponse {
  uuid: string;
  player1: User;
  player2: User;
  createdAt: Date;
  updatedAt: Date;
  status:string;
  lastMoveId?: number;
  winner?: string;
}
