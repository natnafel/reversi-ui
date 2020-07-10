import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GameResponse} from '../../contracts/response/game.response';
import { Observable } from 'rxjs';

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

   // method to get a specific game
   getGameDetails(gameId:string): Observable<GameResponse>{
    return this.http.get<GameResponse> (SERVICE_BASE_URL +"/" + gameId,{
      observe:"body"
      // ,params:new HttpParams().append("token",localStorage.getItem('token'))
    });
  }
}
