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
import {DefaultUserService} from '../../api/general/default-user.service';


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
  playBackDelay = 1000 * 0.5; // 0.5 sec
  lastTimeoutId: number;
  lastAutoPlayId: number;
  BOARD_SIZE = 8;
  board: CellValue[][];
  blackScore = 2;
  whiteScore = 2;
  defaultUserCellValue: CellValue;
  autoPlay = false;

  constructor(
    private gameService: GameApi,
    private defaultUserService: DefaultUserService,
    private route: ActivatedRoute) {
    this.defaultUserService.getDefaultUserCellValue().subscribe((cellValue) => this.defaultUserCellValue = CellValue[cellValue]);
    this.boardToStartState();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params.gameUUID;
      this.loadGameDetails();
      this.loadGameMoves();
      this.gameService.getGameDetails(this.gameId).subscribe((game) => {
        if (game.status === GameStatus.OPEN) {
          this.autoPlayNext();
        }
      });
    });
  }

  changeCellValue(cellLocation: CellLocation, cellValue: CellValue): void {
    this.board[cellLocation.row][cellLocation.col] = cellValue;
    this.blackScore = this.score(CellValue.BLACK);
    this.whiteScore = this.score(CellValue.WHITE);
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
    if (this.hasPreviousCommand()) {
      this.boardCommands[this.lastAppliedCommandPosition--].undo();
    }
  }

  nextMove(): void{
    if (this.hasNextCommand()) {
      this.boardCommands[++this.lastAppliedCommandPosition].apply();
    }
  }

  cellValueForUsername(username: string): CellValue {
    if (username == null) { return; }
    return username === this.game.player1.username ? this.defaultUserCellValue : this.oppositeValue(this.defaultUserCellValue);
  }

  ngOnDestroy(): void {
    clearTimeout(this.lastTimeoutId);
    clearTimeout(this.lastAutoPlayId);
  }

  hasPreviousCommand(): boolean {
    return this.lastAppliedCommandPosition > -1 && this.boardCommands.length !== 0;
  }

  hasNextCommand(): boolean {
    return this.lastAppliedCommandPosition < this.boardCommands.length - 1 && this.boardCommands.length !== 0;
  }

  updateBoardCommands(moves: MoveResponse[]): void {
    if (moves !== null && this.defaultUserCellValue != null) {
      moves.sort((a, b) => {
        if (a.id > b.id) { return 1; }
        else if (a.id < b.id) { return -1; }
        return 0;
      });
      this.boardCommands = [];
      moves.forEach((moveResponse, i) => {
        this.boardCommands.push(new AddNewPieceCommand(this, new CellLocation(moveResponse.row, moveResponse.col),
          this.cellValueForUsername(moveResponse.player.username)));
        this.boardCommands.push(new FlipCellsCommand(this, moveResponse.cellsToFlip));
      });
    }

    if (this.game == null || this.game.status === GameStatus.OPEN) {
      this.loadGameDetails();
      this.lastTimeoutId = setTimeout(this.loadGameMoves.bind(this), this.waitTime);
    }
  }

  emptyValueClass(counter: number): string {
    return counter % 2 === 0 ? 'empty-even' : 'empty-odd';
  }

  occupiedValueClass(cellValue: CellValue): string {
    return cellValue === CellValue.WHITE ? 'white-occupied' : 'black-occupied';
  }

  oppositeValue(value: CellValue): CellValue {
    if (value === CellValue.WHITE) { return CellValue.BLACK; }
    if (value === CellValue.BLACK) { return CellValue.WHITE; }
    throw Error('Can not flip an empty value');
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
  }

  score(cellValue: CellValue): number {
    let count = 0;
    this.board.forEach((rows) => rows.forEach((value) => {
      if (value === cellValue) { count++; }
    }));
    return count;
  }

  autoPlayNext(): void {
    this.nextMove();
    console.log('lastCommand: ' + this.lastAppliedCommandPosition);
    if (!this.gameOver()) {
      this.lastAutoPlayId = setTimeout(this.autoPlayNext.bind(this), this.playBackDelay);
      this.autoPlay = true;
    } else {
      this.autoPlay = false;
    }
  }

  gameOver(): boolean {
    return this.game != null && this.game.status === GameStatus.CLOSED && !this.hasNextCommand();
  }

  winner(): string {
    if (this.blackScore > this.whiteScore) {
      return 'Black';
    } else if (this.blackScore < this.whiteScore) {
      return 'White';
    }
    return 'It\'s a Tie';
  }

  scoreForUsername(username: string): number {
    if (username == null) { return 0; }
    return this.score(this.cellValueForUsername(username));
  }

  toggleAutoPlay(): void{
    if (this.autoPlay) {
      clearTimeout(this.lastAutoPlayId);
      this.autoPlay = false;
    } else {
      this.autoPlayNext();
    }
  }
}
