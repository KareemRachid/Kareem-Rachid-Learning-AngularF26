import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG } from './config/app-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: APP_CONFIG,
      useValue: {
        apiBaseUrl: 'https://placeholder.example.com/api',
        defaultCategory: 'Real Madrid'
      }
    }
  ]
};