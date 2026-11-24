import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private readonly storageKey = 'playermanager.highlight';

  highlightEnabled = signal(this.loadPreference());

  constructor() {
    effect(() => {
      const enabled = this.highlightEnabled();

      try {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify(enabled)
        );
      } catch (error) {
        console.error('Unable to save preference:', error);
      }
    });
  }

  private loadPreference(): boolean {
    try {
      const stored = localStorage.getItem(this.storageKey);

      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  }

  toggleHighlight() {
    this.highlightEnabled.update(enabled => !enabled);
  }
}