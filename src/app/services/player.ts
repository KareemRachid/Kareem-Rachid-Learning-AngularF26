
import {
  Injectable,
  signal,
  computed,
  effect,
  inject
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Player as PlayerModel, PlayerApiResponse } from '../player';
import { APP_CONFIG } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class Player {
  private config = inject(APP_CONFIG);
  private http = inject(HttpClient);

  private playersSignal = signal<PlayerModel[]>([]);

  players = this.playersSignal.asReadonly();

  loading = signal(false);
  error = signal<string | null>(null);

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
    this.loadPlayers();

    effect(() => {
      console.log('Player count:', this.playersSignal().length);
    });
  }

  loadPlayers() {
    this.loading.set(true);
    this.error.set(null);

    const url = `${this.config.apiBaseUrl}/lookup_all_players.php`;

    this.http.get<PlayerApiResponse>(url, {
      params: {
        id: '133604'
      }
    }).subscribe({
      next: (response) => {
        this.playersSignal.set(response.player ?? []);
        this.loading.set(false);
      },

      error: (err) => {
        console.error('Failed to load players:', err);
        this.error.set('Unable to load players from the API.');
        this.loading.set(false);
      }
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
