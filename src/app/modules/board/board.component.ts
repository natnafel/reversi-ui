import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class BoardComponent implements BoardView, OnInit, OnDestroy {
  game: GameResponse;
  gameId: string;
  boardCommands = new Array<BoardCommand>();
  lastAppliedCommandPosition = -1;
  waitTime = 1000 * 3; // 3 seconds
  lastTimeoutId: number;
  BOARD_SIZE = 8;
  board: CellValue[][];

  constructor(
    private gameService: GameApi,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.boardToStartState();
    this.route.params.subscribe(params => {
      this.gameId = params.gameUUID;
      this.loadGameDetails();
      this.loadGameMoves();
    });
  }

  changeCellValue(cellLocation: CellLocation, cellValue: CellValue): void {
    this.board[cellLocation.row][cellLocation.col] = cellValue;
  }

  getCellValue(cellLocation: CellLocation): CellValue {
    return this.board[cellLocation.row][cellLocation.col];
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
    return username === this.game.player1.username ? CellValue.BLACK : CellValue.WHITE;
  }

  ngOnDestroy(): void {
    clearTimeout(this.lastTimeoutId);
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
      this.lastTimeoutId = setTimeout(this.loadGameMoves.bind(this), this.waitTime);
    }
  }

  emptyValueClass(counter: number): string {
    return counter % 2 === 0 ? 'empty-even' : 'empty-odd';
  }

  occupiedValueClass(cellValue: CellValue): string {
    return cellValue === CellValue.WHITE ? 'black-occupied' : 'white-occupied';
  }

  emptyBoard(): CellValue[][] {
    const board = [];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      board.push(new Array<CellValue>());
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        board[i].push(CellValue.EMPTY);
      }
    }
    return board;
  }

  boardToStartState(): void {
    this.board = this.emptyBoard();
    this.board[3][3] = CellValue.BLACK;
    this.board[4][4] = CellValue.BLACK;
    this.board[3][4] = CellValue.WHITE;
    this.board[4][3] = CellValue.WHITE;
    console.log(this.board);
  }
}
