import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GameResponse} from '../../contracts/response/game.response'
import {GameApi} from '../../api/game/game.api';
import {Move} from '../../contracts/shared/board.moves';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board:string[][];
  game: GameResponse;
  gameId: string;
  boardMoves:Move[];
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
                this.boardMoves = game.moves;
                console.log(game)
                console.log(game.moves);
              }
    ,(error)=> console.log("Game detail request failed"));
    
  }

}
