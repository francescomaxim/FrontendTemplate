import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ConfigService } from '../../config.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthMenuComponent } from '../auth/auth-menu/auth-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    LanguageSwitcherComponent,
    CommonModule,
    SidebarComponent,
    AuthMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  //config part
  private router = inject(Router);
  private config = inject(ConfigService);
  appConfig = this.config.appConfig;
  headerConfig = this.config.headerConfig;
  sideMenuConfig = this.config.sideMenuConfig;
  heroConfig = this.config.heroConfig;
  footerConfig = this.config.footerConfig;
  headerFixed = signal<true | false>(false);

  ngOnInit() {
    this.config.getHeaderConfig();
  }

  //go to home
  goToHome() {
    this.router.navigate(['home']);
  }

  //mobile
  mobileMenuOpen = false;
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
