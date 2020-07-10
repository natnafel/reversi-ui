import { Component, OnInit } from '@angular/core';

import {GameResponse} from '../../contracts/response/game.response'
import {GameApi} from '../../api/game/game.api';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board:string[][];
  game: GameResponse;
  gameId: string;
  constructor( private gameService: GameApi,
    private router: Router,
    private route: ActivatedRoute) { this.route.params
      .subscribe(params=>{
        this.gameId = params.gameUUID;
      })
  }

  ngOnInit(): void {
    this.getGameDetails(this.gameId);
  }

  createNewBoard(){
      console.log("game id is =========" + this.gameId)
    }

  getGameDetails(gameId:string){
    this.gameService.getGameDetails(gameId)
    .subscribe((game)=>{
                this.game = game;
                this.board = game.board;
              }
    ,(error)=> console.log("Game detail request failed"));
    
  }

}
