
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EditGuard } from '../services/edit-guard';

export const editGuard: CanActivateFn = () => {
  const guardService = inject(EditGuard);
  const router = inject(Router);

  if (guardService.guardEnabled()) {
    return router.createUrlTree(['/players']);
  }

  return true;
};
