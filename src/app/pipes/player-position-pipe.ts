
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerPosition'
})
export class PlayerPositionPipe implements PipeTransform {

  transform(
    value: string | null | undefined,
    short: boolean = false
  ): string {
    if (!value || value.trim() === '') {
      return 'Unknown Position';
    }

    const position = value.trim();

    if (short) {
      switch (position.toLowerCase()) {
        case 'forward':
          return 'FWD';
        case 'midfielder':
          return 'MID';
        case 'defender':
          return 'DEF';
        case 'goalkeeper':
          return 'GK';
        default:
          return position;
      }
    }

    return position;
  }
}
