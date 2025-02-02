import { Component, inject, input } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher.service';
import { HeaderConfigModel } from '../../../assets/models/header-config.model';
import { SideMenuConfigModel } from '../../../assets/models/side-menu-config.model';
import { HeroConfigModel } from '../../../assets/models/hero-config.model';
import { FooterConfigModel } from '../../../assets/models/footer-config.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageSwitcherService);

  selectedLanguage: string = 'RO';

  headerData = input.required<HeaderConfigModel>();
  sideMenuData = input.required<SideMenuConfigModel>();
  heroData = input.required<HeroConfigModel>();
  footerData = input.required<FooterConfigModel>();

  loading$ = this.languageService.loading$; // Legăm la serviciu

  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    console.log(this.headerData());
    this.languageService.translate(
      this.headerData,
      this.sideMenuData,
      this.heroData,
      this.footerData,
      this.selectedLanguage
    );
  }
}
