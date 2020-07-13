import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {GameResponse} from '../../contracts/response/game.response';
import {GameApi} from '../../api/game/game.api';
import {BoardView} from './board.view';
import {BoardCommand} from './command/board.command';
import {AddNewPieceCommand} from './command/add-new-piece.command';
import {CellLocation} from '../../contracts/shared/cell-location.model';
import {CellValue} from '../../contracts/shared/cell-value.model';
import {FlipCellsCommand} from './command/flip-cells.command';
import {MoveResponse} from '../../contracts/response/move.response';
import {GameStatus} from '../../contracts/shared/game-status.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements BoardView, OnInit {
  game: GameResponse;
  gameId: string;
  boardCommands = new Array<BoardCommand>();
  player1Username: string;
  lastAppliedCommandPosition = -1;
  waitTime = 1000 * 3; // 3 seconds

  constructor(
    private gameService: GameApi,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params.gameUUID;
      this.loadGameDetails();
      this.loadGameMoves();
    });
  }

  changeCellValue(cellLocation: CellLocation, cellValue: CellValue): void {
    // TODO apply UI changes
  }

  getCellValue(cellLocation: CellLocation): CellValue {
    // TODO get cell value on current board
    return CellValue.EMPTY;
  }

  loadGameDetails(): void {
    this.gameService.getGameDetails(this.gameId)
    .subscribe((game) => this.game = game, (error) => console.log('Game detail request failed'));
  }

  loadGameMoves(): void {
    this.gameService.loadGameMoves(this.gameId)
      .subscribe((moves) => {
        this.updateBoardCommands(moves);
      });
  }

  previousMove(): void {
    this.boardCommands[--this.lastAppliedCommandPosition].undo();
  }

  nextMove(): void{
    this.boardCommands[++this.lastAppliedCommandPosition].apply();
  }

  cellValueForUsername(username: string): CellValue {
    // convention: player 1 is black
    return username === this.player1Username ? CellValue.BLACK : CellValue.WHITE;
  }

  updateBoardCommands(moves: MoveResponse[]): void {
    if (moves !== null) {
      moves.sort((a, b) => {
        if (a.id > b.id) { return 1; }
        else if (a.id < b.id) { return -1; }
        return 0;
      });
      moves.forEach((moveResponse, i) => {
        this.boardCommands.push(new AddNewPieceCommand(this, new CellLocation(moveResponse.row, moveResponse.col),
          this.cellValueForUsername(moveResponse.player.username)));
        this.boardCommands.push(new FlipCellsCommand(this, moveResponse.cellsToFlip));
      });
    }

    if (this.game.status === GameStatus.OPEN) {
      this.loadGameDetails();
      setTimeout(this.loadGameMoves.bind(this), this.waitTime);
    }
  }
}
