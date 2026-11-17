
import { Routes } from '@angular/router';
import { editGuard } from './guards/edit-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: 'players',
    loadComponent: () =>
      import('./player-list/player-list')
        .then(m => m.PlayerList)
  },
  {
    path: 'players/add',
    loadComponent: () =>
      import('./player-form/player-form')
        .then(m => m.PlayerForm)
  },
  {
    path: 'players/edit/:id',
    loadComponent: () =>
      import('./player-form/player-form')
        .then(m => m.PlayerForm),
    canActivate: [editGuard]
  },
  {
    path: 'players/:id',
    loadComponent: () =>
      import('./player-detail/player-detail')
        .then(m => m.PlayerDetail)
  },
  {
    path: '**',
    redirectTo: 'players'
  }
];
