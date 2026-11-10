
import { Component, inject } from '@angular/core';
import {
  PlayerListItem,
  PlayerEvent
} from '../player-list-item/player-list-item';
import { Player as PlayerService } from '../services/player';

@Component({
  imports: [PlayerListItem],
  selector: 'app-player-list',
  styleUrl: './player-list.css',
  templateUrl: './player-list.html'
})
export class PlayerList {
  private playerService = inject(PlayerService);

  players = this.playerService.players;
  loading = this.playerService.loading;
  error = this.playerService.error;

  realMadridPlayerCount = this.playerService.realMadridPlayerCount;

  handlePlayerEvent(event: PlayerEvent) {
    this.playerService.removePlayer(event.id);
  }
}
