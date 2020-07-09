import { Component, OnInit } from '@angular/core';
import {GameApi} from '../../api/game/game.api'
import {GameResponse} from '../../contracts/response/game.response'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games:GameResponse[];
  //inject game service after including it in providers array of app.module.ts file
  constructor(private gameService :GameApi) { }

  ngOnInit(): void {
    this.getGameList();
  }

  getGameList(){
    this.gameService.getGameList()
    .subscribe((gameData)=>{
      this.games = gameData;
      console.log(this.games)
    },
    (error)=>console.log(error))
  }

  viewGameDetails(){
    //add routing to a specific game here
  }
}
