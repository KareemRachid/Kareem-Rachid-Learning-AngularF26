import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditGuard {
  guardEnabled = signal(true);

  toggleGuard() {
    this.guardEnabled.update(enabled => !enabled);
  }
}
