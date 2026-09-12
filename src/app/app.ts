import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Kareem-Rachid-Learning-AngularF26');

  StudentInfo: string = "Kareem Rachid 0891773";
  ProgramName: string = "MAD307";
  

}
