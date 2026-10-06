import { Service, signal } from '@angular/core';
import { Player as PlayerModel } from '../player';

@Service()
export class Player {
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
}