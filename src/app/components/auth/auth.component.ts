import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  //login = true/ signup=false
  authMode = signal<true | false>(true);

  switchAuthMode() {
    this.authMode.set(!this.authMode());
  }
}
