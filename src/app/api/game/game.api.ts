import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GameResponse} from '../../contracts/response/game.response';
import { Observable } from 'rxjs';
import { AlgorithmResponse } from 'src/app/contracts/response/algorithm.response';

const SERVICE_BASE_URL: string = environment.apiBaseUrl + '/games';
const ALGO_BASE_URL:string = environment.apiBaseUrl + '/algorithms';

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

  getAlgorithms():Observable<AlgorithmResponse[]>
  {
   return this.http.get<AlgorithmResponse[]>(ALGO_BASE_URL);
  }

}
