
import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export function noWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string;

  if (value && value.trim().length === 0) {
    return { whitespace: true };
  }

  return null;
}

export function nameTeamValidator(
  group: AbstractControl
): ValidationErrors | null {
  const name = group.get('strPlayer')?.value as string;
  const team = group.get('strTeam')?.value as string;

  if (
    name &&
    team &&
    name.trim().toLowerCase() === team.trim().toLowerCase()
  ) {
    return { sameNameAndTeam: true };
  }

  return null;
}
