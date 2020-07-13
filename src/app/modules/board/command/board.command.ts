export interface BoardCommand {
  apply(): void;
  undo(): void;
}
