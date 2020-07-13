import {BoardCommand} from './board.command';
import {BoardView} from '../board.view';
import {CellLocation} from '../../../contracts/shared/cell-location.model';
import {CellValue} from '../../../contracts/shared/cell-value.model';

export class FlipCellsCommand  implements BoardCommand {
  constructor(
    private board: BoardView,
    private flipLocations: CellLocation[]
  ) {
  }

  apply(): void {
    this.flipCells();
  }

  undo(): void {
    this.flipCells();
  }

  flipCells(): void {
    this.flipLocations.forEach((loc) => this.board.changeCellValue(loc, this.oppositeValue(this.board.getCellValue(loc))));
  }

  oppositeValue(value: CellValue): CellValue {
    if (value === CellValue.WHITE) { return CellValue.BLACK; }
    if (value === CellValue.BLACK) { return CellValue.WHITE; }
    throw Error('Can not flip an empty value');
  }
}
