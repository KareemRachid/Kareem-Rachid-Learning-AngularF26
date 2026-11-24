import {
  Directive,
  input,
  signal,
  inject
} from '@angular/core';

import { PreferencesService } from '../services/preferences';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'hovered.set(true)',
    '(mouseleave)': 'hovered.set(false)',
    '[style.backgroundColor]': 'hovered() && preferences.highlightEnabled() ? color() || "#e0f2fe" : null'
  }
})
export class Highlight {
  preferences = inject(PreferencesService);

  color = input('', {
    alias: 'appHighlight'
  });

  hovered = signal(false);
}