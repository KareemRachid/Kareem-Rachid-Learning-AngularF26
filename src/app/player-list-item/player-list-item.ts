import { Component, input } from '@angular/core';
import { Player } from '../player';

@Component({
  imports: [],
  selector: 'app-player-list-item',
  styleUrl: './player-list-item.css',
  templateUrl: './player-list-item.html',
})
export class PlayerListItem {
  player = input.required<Player>();
}