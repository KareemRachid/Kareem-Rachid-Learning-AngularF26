import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[appConfirm]',
  host: {
    '(click)': 'askConfirmation()'
  }
})
export class Confirm {
  question = input('Are you sure?', {
    alias: 'appConfirm'
  });

  confirmed = output<void>();

  askConfirmation() {
    if (window.confirm(this.question())) {
      this.confirmed.emit();
    }
  }
}