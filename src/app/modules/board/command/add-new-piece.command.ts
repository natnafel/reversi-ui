import {BoardCommand} from './board.command';
import {CellLocation} from '../../../contracts/shared/cell-location.model';
import {CellValue} from '../../../contracts/shared/cell-value.model';
import {BoardView} from '../board.view';

export class AddNewPieceCommand implements BoardCommand{
  constructor(
    private board: BoardView,
    private cellLocation: CellLocation,
    private cellValue: CellValue
  ) { }

  apply(): void {
    this.board.changeCellValue(this.cellLocation, this.cellValue);
  }

  undo(): void {
    this.board.changeCellValue(this.cellLocation, CellValue.EMPTY);
  }
}
