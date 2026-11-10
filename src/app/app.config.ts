
import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideRouter,
  withComponentInputBinding
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app.routes';
import { APP_CONFIG } from './config/app-config';

import { loadingInterceptor } from './interceptors/loading';
import { errorInterceptor } from './interceptors/error';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideRouter(routes, withComponentInputBinding()),

    // Loading runs first to track the full request lifecycle.
    // Error handling runs second to capture HTTP failures.
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor
      ])
    ),

    {
      provide: APP_CONFIG,
      useValue: {
        apiBaseUrl: 'https://www.thesportsdb.com/api/v1/json/123',
        defaultCategory: 'Arsenal'
      }
    }
  ]
};
