import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe, TitleCasePipe, DatePipe } from '@angular/common';
import { Player } from '../player';
import { PlayerNamePipe } from '../pipes/player-name-pipe';
import { PlayerPositionPipe } from '../pipes/player-position-pipe';
import { Highlight } from '../directives/highlight';

export interface PlayerEvent {
  id: string;
  action: 'opened' | 'favourited';
}

@Component({
  imports: [
    RouterLink,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    PlayerNamePipe,
    PlayerPositionPipe,
    Highlight
  ],
  selector: 'app-player-list-item',
  styleUrl: './player-list-item.css',
  templateUrl: './player-list-item.html'
})
export class PlayerListItem {
  player = input.required<Player>();

  playerEvent = output<PlayerEvent>();

  today = new Date();

  playerClicked() {
    this.playerEvent.emit({
      id: this.player().idPlayer,
      action: 'opened'
    });
  }
}