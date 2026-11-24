import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { EditGuard } from './services/edit-guard';
import { LoadingService } from './services/loading';
import { ErrorService } from './services/error';
import { PreferencesService } from './services/preferences';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  editGuard = inject(EditGuard);
  loadingService = inject(LoadingService);
  errorService = inject(ErrorService);
  preferences = inject(PreferencesService);

  toggleEditing() {
    this.editGuard.toggleGuard();
  }

  dismissError() {
    this.errorService.clearError();
  }
}