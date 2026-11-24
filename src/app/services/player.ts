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

  private readonly storageKey = 'playermanager.customPlayers';

  private apiPlayers = signal<PlayerModel[]>([]);
  private customPlayers = signal<PlayerModel[]>(this.loadCustomPlayers());

  players = computed(() => [
    ...this.apiPlayers(),
    ...this.customPlayers()
  ]);

  loading = signal(false);
  error = signal<string | null>(null);

  realMadridPlayers = computed(() =>
    this.players().filter(
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
      console.log('Player count:', this.players().length);
    });

    effect(() => {
      const players = this.customPlayers();

      try {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify(players)
        );
      } catch (error) {
        console.error('Unable to save custom players:', error);
      }
    });
  }

  private loadCustomPlayers(): PlayerModel[] {
    try {
      const stored = localStorage.getItem(this.storageKey);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
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
        this.apiPlayers.set(response.player ?? []);
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
    return this.players().find(
      player => player.idPlayer === id
    );
  }

  addPlayer(newPlayer: PlayerModel) {
    this.customPlayers.update(list => [
      ...list,
      newPlayer
    ]);
  }

  updatePlayer(id: string, updatedPlayer: PlayerModel) {
    if (this.customPlayers().some(player => player.idPlayer === id)) {
      this.customPlayers.update(list =>
        list.map(player =>
          player.idPlayer === id ? updatedPlayer : player
        )
      );
    } else {
      this.apiPlayers.update(list =>
        list.map(player =>
          player.idPlayer === id ? updatedPlayer : player
        )
      );
    }
  }

  removePlayer(id: string) {
    this.customPlayers.update(list =>
      list.filter(player => player.idPlayer !== id)
    );

    this.apiPlayers.update(list =>
      list.filter(player => player.idPlayer !== id)
    );
  }
}