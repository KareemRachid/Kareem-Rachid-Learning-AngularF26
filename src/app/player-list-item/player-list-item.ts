import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../player';

export interface PlayerEvent {
  number: number;
  action: 'opened' | 'favourited';
}

@Component({
  imports: [RouterLink],
  selector: 'app-player-list-item',
  styleUrl: './player-list-item.css',
  templateUrl: './player-list-item.html',
})
export class PlayerListItem {
  player = input.required<Player>();

  playerEvent = output<PlayerEvent>();

  playerClicked() {
    this.playerEvent.emit({
      number: this.player().number,
      action: 'opened'
    });
  }
}