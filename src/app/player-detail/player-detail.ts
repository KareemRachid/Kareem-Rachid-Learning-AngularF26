import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../services/player';

@Component({
  selector: 'app-player-detail',
  imports: [RouterLink],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css'
})
export class PlayerDetail {
  id = input<string>();

  private playerService = inject(Player);

  selectedPlayer = computed(() => {
    const playerNumber = Number(this.id());

    return this.playerService.players().find(
      player => player.number === playerNumber
    );
  });
}