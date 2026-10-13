import { Injectable, signal, computed } from '@angular/core';
import { Player as PlayerModel } from '../player';

@Injectable()
export class MockPlayer {
  private playersSignal = signal<PlayerModel[]>([
    {
      name: 'Mock Striker',
      number: 99,
      position: 'Forward',
      team: 'Test FC',
      nationality: 'Canada',
      imageUrl: 'players/mbappe.jpg'
    },
    {
      name: 'Mock Defender',
      number: 88,
      position: 'Defender',
      team: 'Test FC',
      nationality: 'England',
      imageUrl: 'players/ramos.jpg'
    }
  ]);

  players = this.playersSignal.asReadonly();

  realMadridPlayers = computed(() =>
    this.playersSignal().filter(player => player.team === 'Real Madrid')
  );

  realMadridPlayerCount = computed(() =>
    this.realMadridPlayers().length
  );

  dataSource = 'Mock player data';

  addPlayer(newPlayer: PlayerModel) {
    this.playersSignal.update(list => [...list, newPlayer]);
  }

  removePlayer(number: number) {
    this.playersSignal.update(list =>
      list.filter(player => player.number !== number)
    );
  }
}