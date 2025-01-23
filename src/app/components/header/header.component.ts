import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { HeaderModel } from './header.model';

@Component({
  selector: 'app-header',
  imports: [NgIf, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  headerData = signal<HeaderModel>({
    title: 'My Title',
  });
}
