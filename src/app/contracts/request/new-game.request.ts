import {PlayerType} from '../shared/player-type.model';

export interface NewGameRequest {
  userName: string;
  firstMove: PlayerType;
}
