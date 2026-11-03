import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Kareem-Rachid-Learning-AngularF26');

  StudentInfo: string = 'Kareem Rachid 0891773';
  ProgramName: string = 'MAD307';
}