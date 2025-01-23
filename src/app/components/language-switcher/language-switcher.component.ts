import { Component } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  selectedLanguage: string = 'EN';

  // Funcția care gestionează selectarea unei limbi
  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    console.log(`Language selected: ${language}`);
  }
}
