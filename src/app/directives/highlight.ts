import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'hovered.set(true)',
    '(mouseleave)': 'hovered.set(false)',
    '[style.backgroundColor]': 'hovered() ? color() || "#e0f2fe" : null'
  }
})
export class Highlight {
  color = input('', { alias: 'appHighlight' });

  hovered = signal(false);
}