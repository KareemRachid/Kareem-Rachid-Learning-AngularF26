
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
      strPlayer: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          noWhitespaceValidator
        ]
      ],
      strNumber: [''],
      strPosition: ['Forward'],
      strTeam: ['', Validators.required],
      strNationality: [''],
      strThumb: ['']
    },
    {
      validators: nameTeamValidator
    }
  );

  ngOnInit() {
    const playerId = this.id();

    if (playerId !== undefined) {
      const existingPlayer = this.playerService.getPlayer(playerId);

      if (existingPlayer) {
        this.isEditMode = true;

        this.playerForm.patchValue({
          strPlayer: existingPlayer.strPlayer,
          strNumber: existingPlayer.strNumber ?? '',
          strPosition: existingPlayer.strPosition ?? 'Forward',
          strTeam: existingPlayer.strTeam,
          strNationality: existingPlayer.strNationality ?? '',
          strThumb: existingPlayer.strThumb ?? ''
        });
      }
    }
  }

  onSubmit() {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }

    const values = this.playerForm.getRawValue();

    const player: Player = {
      idPlayer: this.isEditMode
        ? this.id()!
        : `local-${Date.now()}`,
      strPlayer: values.strPlayer,
      strNumber: values.strNumber || null,
      strPosition: values.strPosition || null,
      strTeam: values.strTeam,
      strNationality: values.strNationality || null,
      strThumb: values.strThumb || null
    };

    if (this.isEditMode) {
      this.playerService.updatePlayer(this.id()!, player);
      this.router.navigate(['/players', player.idPlayer]);
    } else {
      this.playerService.addPlayer(player);
      this.playerForm.reset();
    }
  }
}
