
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EditGuard } from './services/edit-guard';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  editGuard = inject(EditGuard);
  loadingService = inject(LoadingService);

  toggleEditing() {
    this.editGuard.toggleGuard();
  }
}
