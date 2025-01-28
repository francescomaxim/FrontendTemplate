import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { HeaderConfigModel } from '../assets/models/header-config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private httpClient = inject(HttpClient);
  private headerConfigUrl = 'assets/configs/header-config.json';

  headerConfig = signal<HeaderConfigModel | undefined>(undefined);

  getHeaderConfig() {
    this.fetchData(this.headerConfigUrl).subscribe((response) => {
      this.headerConfig.set(response);
    });
  }

  private fetchData(url: string) {
    return this.httpClient.get<HeaderConfigModel>(url);
  }
}
