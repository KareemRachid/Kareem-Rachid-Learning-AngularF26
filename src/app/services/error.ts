
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSignal = signal<string | null>(null);

  error = this.errorSignal.asReadonly();

  showError(message: string) {
    this.errorSignal.set(message);
  }

  clearError() {
    this.errorSignal.set(null);
  }
}
