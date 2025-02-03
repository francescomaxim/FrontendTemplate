import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-menu',
  imports: [],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.css',
})
export class AuthMenuComponent {
  private router = inject(Router);

  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
