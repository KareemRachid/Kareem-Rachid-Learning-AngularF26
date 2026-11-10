
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong. Please try again.';

      if (error.status === 0) {
        message = 'Network error. Please check your internet connection.';
      } else if (error.status === 404) {
        message = 'The requested resource could not be found.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.status === 401 || error.status === 403) {
        message = 'You do not have permission to access this resource.';
      }

      errorService.showError(message);

      return throwError(() => error);
    })
  );
};
