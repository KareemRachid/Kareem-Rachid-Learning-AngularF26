
import { Routes } from '@angular/router';
import { PlayerList } from './player-list/player-list';
import { PlayerDetail } from './player-detail/player-detail';
import { PlayerForm } from './player-form/player-form';
import { editGuard } from './guards/edit-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: 'players',
    component: PlayerList
  },
  {
    path: 'players/add',
    component: PlayerForm
  },
  {
    path: 'players/edit/:id',
    component: PlayerForm,
    canActivate: [editGuard]
  },
  {
    path: 'players/:id',
    component: PlayerDetail
  },
  {
    path: '**',
    redirectTo: 'players'
  }
];
