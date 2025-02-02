import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();

  model: any = {}; // Model pentru formular

  onSubmit() {
    // Aici poți implementa logica de trimitere a formularului
    console.log('Formular trimis!', this.model);
    alert('Formularul a fost trimis! (Funcționalitate de implementat)');
    this.model = {}; // Resetează formularul
  }

  //CONFIG
  private config = inject(ConfigService);
  footerConfig = this.config.footerConfig;
  ngOnInit(): void {
    this.config.getFooterConfig();
  }
}
