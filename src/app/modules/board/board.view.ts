import {CellLocation} from '../../contracts/shared/cell-location.model';
import {CellValue} from '../../contracts/shared/cell-value.model';

export interface BoardView {
  changeCellValue(cellLocation: CellLocation, cellValue: CellValue): void;
  getCellValue(cellLocation: CellLocation): CellValue;
}
