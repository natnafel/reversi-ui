import { Component, OnInit } from '@angular/core';
import {AlgorithmResponse} from '../../contracts/response/algorithm.response';
import {Router} from '@angular/router';
import {GameApi} from '../../api/game/game.api';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})

export class NewGameComponent implements OnInit {
  activeAlgorithms: AlgorithmResponse[];
  constructor(
    private gameService: GameApi,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAlgorithms();
  }
  loadAlgorithms(): void{
    this.gameService.getAlgorithms()
    .subscribe((algorithmData) => {
      console.log(algorithmData)
     this.activeAlgorithms = algorithmData;
    });
    //.filter((value, index) => value.status === GameStatus.OPEN);
    //   this.closedGames = gameData.filter((value, index, array) => value.status === GameStatus.CLOSED);
    // },
    // (error) => console.log(error));
  }
  writeSearchWord(userName)
  {
    const name = userName.value;
  }
}
