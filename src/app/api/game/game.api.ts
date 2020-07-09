import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {Response} from '@angular/http';
import {environment} from '../../../environments/environment';
import {GameResponse} from '../../contracts/response/game.response'

const SERVICE_BASE_URL: string = environment.apiBaseUrl + '/games';

@Injectable({
  providedIn: 'root'
})
export class GameApi {

  gameList:GameResponse[];
  constructor(
    
    private http: HttpClient
    
  ) { }
  
  // method to get the list of games
  getGameList(){
    // return this.gameList;
    return this.http.get(SERVICE_BASE_URL,{
      observe:"body"
    })
  }
}
