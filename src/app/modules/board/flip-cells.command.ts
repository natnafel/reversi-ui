import {BoardCommand} from './board.command';
import {BoardView} from './board.view';
import {CellLocation} from '../../contracts/shared/cell-location.model';

export class FlipCellsCommand  implements BoardCommand {
  constructor(
    private board: BoardView,
    private flipLocations: CellLocation[]
  ) {
  }

  apply(): void {
  }

  undo(): void {
  }

}
