import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})

export class NewGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  writeSearchWord(userName)
  {
    const name = userName.value;
  }
  
}
