import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  },
  {
    path: 'players',
    pathMatch: 'full',
    loadComponent: () =>
      import('./player-list/player-list')
        .then(m => m.PlayerList)
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./player-form/player-form.routes')
        .then(m => m.playerFormRoutes)
  },
  {
    path: 'players/:id',
    loadComponent: () =>
      import('./player-detail/player-detail')
        .then(m => m.PlayerDetail)
  },
  {
    path: 'saved',
    loadComponent: () =>
      import('./saved-players/saved-players')
        .then(m => m.SavedPlayers)
  },
  {
    path: '**',
    redirectTo: 'players'
  }
];