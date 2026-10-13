import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Player as PlayerModel } from '../player';
import { APP_CONFIG } from '../config/app-config';

@Injectable({ providedIn: 'root' })
export class Player {
  private config = inject(APP_CONFIG);

  private playersSignal = signal<PlayerModel[]>([
    {
      name: 'Kylian Mbappe',
      number: 10,
      position: 'Forward',
      team: 'Real Madrid',
      nationality: 'France',
      imageUrl: 'players/mbappe.jpg'
    },
    {
      name: 'Sergio Ramos',
      number: 4,
      position: 'Defender',
      team: 'Monterrey',
      nationality: 'Spain',
      imageUrl: 'players/ramos.jpg'
    },
    {
      name: 'Jude Bellingham',
      number: 5,
      position: 'Midfielder',
      team: 'Real Madrid',
      nationality: 'England',
      imageUrl: 'players/bellingham.jpg'
    },
    {
      name: 'Thibaut Courtois',
      number: 1,
      position: 'Goalkeeper',
      team: 'Real Madrid',
      imageUrl: 'players/courtois.jpg'
    }
  ]);

  players = this.playersSignal.asReadonly();

  realMadridPlayers = computed(() =>
    this.playersSignal().filter(
      player => player.team === this.config.defaultCategory
    )
  );

  realMadridPlayerCount = computed(() =>
    this.realMadridPlayers().length
  );

  dataSource = `Placeholder API: ${this.config.apiBaseUrl}`;

  constructor() {
    effect(() => {
      console.log('Player count:', this.playersSignal().length);
    });
  }

  addPlayer(newPlayer: PlayerModel) {
    this.playersSignal.update(list => [...list, newPlayer]);
  }

  removePlayer(number: number) {
    this.playersSignal.update(list =>
      list.filter(player => player.number !== number)
    );
  }
}