import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {GameResponse} from '../../contracts/response/game.response';
import {GameApi} from '../../api/game/game.api';
import {Move} from '../../contracts/shared/board.moves';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  game: GameResponse;
  gameId: string;
  boardMoves:Move[];
  constructor( private gameService: GameApi,
    private router: Router,
    private route: ActivatedRoute) { this.route.params
      .subscribe(params => {
        this.gameId = params.gameUUID;
      });
  }

  ngOnInit(): void {
    this.loadGameDetails(this.gameId);
  }

  loadGameDetails(gameId: string): void {
    this.gameService.getGameDetails(gameId)
    .subscribe((game) => this.game = game
    ,(error) => console.log('Game detail request failed'));
  }

  loadGameMoves(gameId:string):void{
    this.gameService.loadGameMoves(gameId)
      .subscribe((moves)=>{
        this.boardMoves = moves;
      }, (error)=>{
        console.log(error);
      })
  }
}
