import { Component, OnInit } from '@angular/core';
import {AlgorithmResponse} from '../../contracts/response/algorithm.response';
import {Router} from '@angular/router';
import {GameApi} from '../../api/game/game.api';
import {ProtocolResponse} from '../../contracts/response/protocol.response';
import {AlgorithmsApi} from '../../api/algorithms/algorithms.api';
import {ProtocolApi} from '../../api/protocol/protocol.api';
import {NewGameRequest} from '../../contracts/request/new-game.request';
import {Console} from '@angular/compiler/src/util';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  activeAlgorithms: AlgorithmResponse[];
  protocols: ProtocolResponse[];

  newGameForm = new NewGameRequest(null, null, false, null, null);

  constructor(
    private gameService: GameApi,
    private algorithmService: AlgorithmsApi,
    private protocolService: ProtocolApi,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAlgorithms();
    this.loadProtocols();
  }

  loadAlgorithms(): void {
    this.algorithmService.getAllAlgorithms()
    .subscribe((algorithmData) => {
      this.activeAlgorithms = algorithmData;
    });
  }

  loadProtocols(): void {
    this.protocolService.getAllProtocols().subscribe((protocols) => this.protocols = protocols);
  }

  startGame(): void {
    this.gameService.startGame(this.newGameForm)
      .subscribe((newGameResponse) => this.router.navigateByUrl(`board/${newGameResponse.gameId}`));
  }
}
