import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerPosition'
})
export class PlayerPositionPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value || value.trim() === '') {
      return 'Unknown Position';
    }

    return value.trim();
  }
}