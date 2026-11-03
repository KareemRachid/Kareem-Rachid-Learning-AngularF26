
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Player as PlayerService } from '../services/player';
import { Player } from '../player';

@Component({
  selector: 'app-player-form',
  imports: [ReactiveFormsModule],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css'
})
export class PlayerForm {
  private fb = inject(FormBuilder);
  private playerService = inject(PlayerService);

  playerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    number: [0, [Validators.required, Validators.min(1)]],
    position: ['Forward' as Player['position'], Validators.required],
    team: ['', Validators.required],
    nationality: [''],
    imageUrl: ['']
  });

  onSubmit() {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    const newPlayer: Player = this.playerForm.getRawValue();

    this.playerService.addPlayer(newPlayer);

    this.playerForm.reset();
  }
}
