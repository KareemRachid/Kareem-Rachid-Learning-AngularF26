import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../services/player';
import { SavedService } from '../services/saved';

@Component({
  selector: 'app-saved-players',
  imports: [RouterLink],
  templateUrl: './saved-players.html',
  styleUrl: './saved-players.css'
})
export class SavedPlayers {
  private playerService = inject(Player);
  private savedService = inject(SavedService);

  loading = this.playerService.loading;

  savedPlayers = computed(() =>
    this.playerService.players().filter(player =>
      this.savedService.savedIds().includes(player.idPlayer)
    )
  );
}