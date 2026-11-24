import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { Player } from '../services/player';
import { Highlight } from '../directives/highlight';
import { SavedService } from '../services/saved';

@Component({
  selector: 'app-player-detail',
  imports: [RouterLink, Highlight],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css'
})
export class PlayerDetail implements OnInit, OnDestroy {
  id = input<string>();

  private playerService = inject(Player);
  savedService = inject(SavedService);

  private openedAt = 0;
  private openedPlayerName = 'Unknown Player';

  selectedPlayer = computed(() => {
    const playerId = this.id();

    return this.playerService.players().find(
      player => player.idPlayer === playerId
    );
  });

  ngOnInit(): void {
    const player = this.selectedPlayer();

    this.openedPlayerName =
      player?.strPlayer || 'Unknown Player';

    this.openedAt = Date.now();

    console.log(
      `[lifecycle] opened: ${this.openedPlayerName}`
    );
  }

  ngOnDestroy(): void {
    const seconds = Math.round(
      (Date.now() - this.openedAt) / 1000
    );

    console.log(
      `[lifecycle] closed: ${this.openedPlayerName} after ${seconds} seconds`
    );
  }
}