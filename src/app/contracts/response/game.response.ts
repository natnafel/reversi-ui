export interface GameResponse {
  gameUUID: string;
  player1: string;
  player2: string;
  winner?: string;
  lastMoveId?: number;
}
