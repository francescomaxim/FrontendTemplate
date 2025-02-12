import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthMenuService {
  mode = signal<number>(0);

  signedInMode() {
    this.mode.set(0);
  }

  profileMode() {
    this.mode.set(1);
  }
}
