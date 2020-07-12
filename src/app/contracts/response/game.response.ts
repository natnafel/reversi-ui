import {User} from '../shared/user';
import {GameStatus} from '../shared/game-status.model';
import {Player} from '../shared/player.model';
import {Move}  from '../shared/board.moves'
import {CellValue} from '../shared/cell-value.model';

export interface GameResponse {
  uuid: string;
  player1: User;
  player2: User;
  createdAt: Date;
  updatedAt: Date;
  status: GameStatus;
  lastMoveId?: number;
  winner?: Player;
  moves?:Move[];
  board?: CellValue[][];
}
