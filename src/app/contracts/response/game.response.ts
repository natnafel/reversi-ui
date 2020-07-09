export interface GameResponse {
  gameUUID: string;
  player1: string;
  player2: string;
  startDate: Date,
  winner?: string;
  endDate?: Date,
  lastMoveId?: number;
}
