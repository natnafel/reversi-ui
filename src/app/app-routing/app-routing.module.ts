import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from '../layouts/default/default.component';
import {HomeComponent} from '../modules/home/home.component';
import {NewGameComponent} from '../modules/new-game/new-game.component';
import {BoardComponent} from '../modules/board/board.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'new-game',
        component: NewGameComponent
      },
      {
        path: 'board/:gameUUID',
        component: BoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
