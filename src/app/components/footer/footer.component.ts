import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year: number = new Date().getFullYear();

  model: any = {}; // Model pentru formular

  onSubmit() {
    // Aici poți implementa logica de trimitere a formularului
    console.log('Formular trimis!', this.model);
    alert('Formularul a fost trimis! (Funcționalitate de implementat)');
    this.model = {}; // Resetează formularul
  }
}
