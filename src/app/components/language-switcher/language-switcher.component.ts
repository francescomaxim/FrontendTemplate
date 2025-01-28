import { Component, inject, input } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher.service';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageSwitcherService);

  selectedLanguage: string = 'EN';

  // headerData = input.required<HeaderModel>();

  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    // this.languageService.translate(this.headerData, this.selectedLanguage);
  }
}
