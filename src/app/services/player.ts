
import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Player as PlayerModel } from '../player';
import { APP_CONFIG } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class Player {
  private config = inject(APP_CONFIG);

  private playersSignal = signal<PlayerModel[]>([]);

  players = this.playersSignal.asReadonly();

  realMadridPlayers = computed(() =>
    this.playersSignal().filter(
      player => player.strTeam === this.config.defaultCategory
    )
  );

  realMadridPlayerCount = computed(() =>
    this.realMadridPlayers().length
  );

  dataSource = this.config.apiBaseUrl;

  constructor() {
    effect(() => {
      console.log('Player count:', this.playersSignal().length);
    });
  }

  getPlayer(id: string) {
    return this.playersSignal().find(
      player => player.idPlayer === id
    );
  }

  addPlayer(newPlayer: PlayerModel) {
    this.playersSignal.update(list => [...list, newPlayer]);
  }

  updatePlayer(id: string, updatedPlayer: PlayerModel) {
    this.playersSignal.update(list =>
      list.map(player =>
        player.idPlayer === id ? updatedPlayer : player
      )
    );
  }

  removePlayer(id: string) {
    this.playersSignal.update(list =>
      list.filter(player => player.idPlayer !== id)
    );
  }
}
