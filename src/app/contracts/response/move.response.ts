import {User} from '../shared/user';
import {CellLocation} from '../shared/cell-location.model';

export interface MoveResponse {
    id: number;
    row: number;
    col: number;
    player: User;
    cellsToFlip: CellLocation[];
}
