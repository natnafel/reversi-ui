import {FirstMove} from '../shared/first-move.model';

export interface NewGameRequest {
  userName: string;
  firstMove: FirstMove;
}
