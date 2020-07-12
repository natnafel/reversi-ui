export class NewGameRequest {
  constructor(
    public protocol: string,
    public algorithm: string,
    public makeFirstMove: boolean,
    public address: string,
    public port: number
  ) { }
}
