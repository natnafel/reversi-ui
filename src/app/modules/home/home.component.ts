import {Component, OnInit} from '@angular/core';
import {GameApi} from '../../api/game/game.api';
import {GameResponse} from '../../contracts/response/game.response';
import {GameStatus} from '../../contracts/shared/game-status.model';
import {Router, ActivatedRoute} from '@angular/router';
import {Player} from '../../contracts/shared/player.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeGames: GameResponse[];
  closedGames: GameResponse[];
  constructor(
    private gameService: GameApi,
    private router: Router,
    private route: ActivatedRoute
  ) { this.route.params
    .subscribe(params=>console.log(params))
  }

  ngOnInit(): void {
    this.loadGameList();
  }

  loadGameList(): void{
    this.gameService.getGameList()
    .subscribe((gameData) => {
      this.activeGames = gameData.filter((value, index, array) => value.status === GameStatus.OPEN);
      this.closedGames = gameData.filter((value, index, array) => value.status === GameStatus.CLOSED);
    },
    (error) => console.log(error));
  }

  showGameBoard(game: GameResponse): void{
    this.router.navigateByUrl('board/' + game.uuid);
  }

  winnerUsername(game: GameResponse): string {
    return game.winner === Player.PLAYER1 ? game.player1.username : game.player2.username;
  }
}
