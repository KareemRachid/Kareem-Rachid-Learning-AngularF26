
import { Injectable, signal, computed } from '@angular/core';
import { Player } from '../player';

@Injectable({
  providedIn: 'root'
})
export class MockPlayer {
  private playersSignal = signal<Player[]>([
    {
      idPlayer: 'mock-1',
      strPlayer: 'Mock Striker',
      strNumber: '9',
      strPosition: 'Forward',
      strTeam: 'Arsenal',
      strNationality: 'England',
      strThumb: null
    },
    {
      idPlayer: 'mock-2',
      strPlayer: 'Mock Defender',
      strNumber: '4',
      strPosition: 'Defender',
      strTeam: 'Arsenal',
      strNationality: 'England',
      strThumb: null
    }
  ]);

  players = this.playersSignal.asReadonly();

  realMadridPlayers = computed(() =>
    this.playersSignal().filter(
      player => player.strTeam === 'Arsenal'
    )
  );

  realMadridPlayerCount = computed(() =>
    this.realMadridPlayers().length
  );

  getPlayer(id: string) {
    return this.playersSignal().find(
      player => player.idPlayer === id
    );
  }

  addPlayer(player: Player) {
    this.playersSignal.update(list => [...list, player]);
  }

  updatePlayer(id: string, updatedPlayer: Player) {
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
