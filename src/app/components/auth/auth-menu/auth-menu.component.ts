import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMenuService } from './auth-menu.service';

@Component({
  selector: 'app-auth-menu',
  imports: [],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.css',
})
export class AuthMenuComponent {
  private router = inject(Router);
  private authMenuService = inject(AuthMenuService);

  mode = this.authMenuService.mode;

  goToAuth() {
    this.router.navigate(['/auth']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
