import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerName'
})
export class PlayerNamePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value || value.trim() === '') {
      return 'Unknown Player';
    }

    return value.trim();
  }
}