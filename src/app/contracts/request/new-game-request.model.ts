import {PlayerType} from '../shared/player-type.model';

export interface NewGameRequestModel {
  userName: string;
  firstMove: PlayerType;
}
