
import { Routes } from '@angular/router';
import { editGuard } from '../guards/edit-guard';

export const playerFormRoutes: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./player-form').then(m => m.PlayerForm)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./player-form').then(m => m.PlayerForm),
    canActivate: [editGuard]
  }
];
