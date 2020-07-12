import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from './default.component';
import {HomeComponent} from '../../modules/home/home.component';
import {NewGameComponent} from '../../modules/new-game/new-game.component';
import {BoardComponent} from '../../modules/board/board.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    NewGameComponent,
    BoardComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ]
})
export class DefaultModule { }
