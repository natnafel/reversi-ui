import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board:any[][];
  constructor() { }

  ngOnInit(): void {
    this.createNewBoard();
    this.board[3][3] =1;
    this.board[3][4] =2;
  }

  createNewBoard(){
    this.board= [];
    for(var i:number=0; i<8; i++){
      this.board[i] = [];
      for(var j:number = 0; j<8; j++){
        this.board[i][j] = new Number();
      }
    }
  }

}
