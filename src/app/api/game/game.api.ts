import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {GameResponse} from '../../contracts/response/game.response';
import {Move} from '../../contracts/shared/board.moves';
import {NewGameRequest} from '../../contracts/request/new-game.request';
import {NewGameResponse} from '../../contracts/response/new-game.response';

const SERVICE_BASE_URL: string = environment.apiBaseUrl + '/games';

@Injectable({
  providedIn: 'root'
})
export class GameApi {

  constructor(
    private http: HttpClient
  ) { }

  // method to get the list of games
  getGameList(): Observable<GameResponse[]>{
    return this.http.get<GameResponse[]> (SERVICE_BASE_URL);
  }

  startGame(newGameRequest: NewGameRequest): Observable<NewGameResponse> {
    return this.http.post<NewGameResponse>(`${SERVICE_BASE_URL}/away`, newGameRequest);
  }
  // method to get a specific game
  getGameDetails(gameId: string): Observable<GameResponse>{
    return this.http.get<GameResponse> (SERVICE_BASE_URL + `/${gameId}`);
  }

  loadGameMoves(gameId: string): Observable<Move[]>{
    return this.http.get<Move[]>(`${SERVICE_BASE_URL}/${gameId}/moves`);
  }

  loadGameDetailsAtMoveId(gameId: string, moveId: number): Observable<GameResponse>{
    return this.http.get<GameResponse> (SERVICE_BASE_URL + `/${gameId}/${moveId}`);
  }
}
