import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedService {
  private readonly storageKey = 'playermanager.saved';

  private savedSignal = signal<string[]>(this.loadSaved());

  savedIds = this.savedSignal.asReadonly();

  constructor() {
    effect(() => {
      const ids = this.savedSignal();

      try {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify(ids)
        );
      } catch (error) {
        console.error('Unable to save players:', error);
      }
    });
  }

  private loadSaved(): string[] {
    try {
      const stored = localStorage.getItem(this.storageKey);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      if (
        Array.isArray(parsed) &&
        parsed.every(id => typeof id === 'string')
      ) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  }

  toggle(id: string) {
    this.savedSignal.update(ids =>
      ids.includes(id)
        ? ids.filter(savedId => savedId !== id)
        : [...ids, id]
    );
  }

  isSaved(id: string): boolean {
    return this.savedSignal().includes(id);
  }
}