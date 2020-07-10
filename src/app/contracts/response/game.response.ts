import {User} from '../shared/user';
import {GameStatus} from '../shared/game-status.model';
import {Player} from '../shared/player.model';

export interface GameResponse {
  uuid: string;
  player1: User;
  player2: User;
  createdAt: Date;
  updatedAt: Date;
  status: GameStatus;
  lastMoveId?: number;
  winner?: Player;
  board?:string[][];
}
