import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player } from './player';
import { PlayerList } from './player-list/player-list';
@Component({
  imports: [RouterOutlet, PlayerList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Kareem-Rachid-Learning-AngularF26');

  StudentInfo: string = "Kareem Rachid 0891773";
  ProgramName: string = "MAD307";
  
  players: Player[]= [
  {
    name: 'Cristiano Ronaldo',
    number: 7,
    position: 'Forward',
    team: 'Al-Nassr',
    nationality: 'Portugal'
  },
  {
    name:'Kylian Mbappe',
    number: 10, 
    position:'Forward',
    team: 'Real Madrid',
    nationality: 'France'
  },
  {
  name: 'Neymar Jr',
  number: 10,
  position: 'Forward',
  team: 'Santos',
  nationality: 'Brazil'
  },
  {
  name: 'Jude Bellingham',
  number: 5,
  position: 'Midfielder',
  team: 'Real Madrid',
  nationality: 'England'
  },
  {
  name: 'Sergio Ramos',
  number: 4,
  position: 'Defender',
  team: 'Monterrey'
  },
  {
  name: 'Thibaut Courtois',
  number: 1,
  position: 'Goalkeeper',
  team: 'Real Madrid',
  nationality: 'Belgium'
  }
  ];

}
