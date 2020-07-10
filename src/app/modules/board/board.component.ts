import {Component, OnInit} from '@angular/core';

import {GameResponse} from '../../contracts/response/game.response';
import {GameApi} from '../../api/game/game.api';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  game: GameResponse;
  gameId: string;
  constructor(
    private gameService: GameApi,
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

}
