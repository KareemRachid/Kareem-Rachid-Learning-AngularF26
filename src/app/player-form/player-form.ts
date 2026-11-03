
import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Player as PlayerService } from '../services/player';
import { Player } from '../player';
import {
  noWhitespaceValidator,
  nameTeamValidator
} from '../validators/player-validators';

@Component({
  selector: 'app-player-form',
  imports: [ReactiveFormsModule],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css'
})
export class PlayerForm implements OnInit {
  id = input<string>();

  private fb = inject(FormBuilder);
  private playerService = inject(PlayerService);
  private router = inject(Router);

  isEditMode = false;

  playerForm = this.fb.nonNullable.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          noWhitespaceValidator
        ]
      ],
      number: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      position: [
        'Forward' as Player['position'],
        Validators.required
      ],
      team: ['', Validators.required],
      nationality: [''],
      imageUrl: ['']
    },
    {
      validators: nameTeamValidator
    }
  );

  ngOnInit() {
    const playerId = this.id();

    if (playerId !== undefined) {
      const existingPlayer = this.playerService.getPlayer(Number(playerId));

      if (existingPlayer) {
        this.isEditMode = true;

        this.playerForm.patchValue({
          name: existingPlayer.name,
          number: existingPlayer.number,
          position: existingPlayer.position,
          team: existingPlayer.team,
          nationality: existingPlayer.nationality ?? '',
          imageUrl: existingPlayer.imageUrl
        });
      }
    }
  }

  onSubmit() {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    const player: Player = this.playerForm.getRawValue();

    if (this.isEditMode) {
      this.playerService.updatePlayer(Number(this.id()), player);
      this.router.navigate(['/players', player.number]);
    } else {
      this.playerService.addPlayer(player);
      this.playerForm.reset();
    }
  }
}
