import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderConfigModel } from '../assets/models/header-config.model';
import { HeroConfigModel } from '../assets/models/hero-config.model';
import { SideMenuConfigModel } from '../assets/models/side-menu-config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private httpClient = inject(HttpClient);
  private headerConfigUrl = 'assets/configs/header-config.json';
  private heroConfigUrl = 'assets/configs/hero-config.json';
  private sideMenuConfigUrl = 'assets/configs/side-menu-config.json';

  headerConfig = signal<HeaderConfigModel | undefined>(undefined);
  heroConfig = signal<HeroConfigModel | undefined>(undefined);
  sideMenuConfig = signal<SideMenuConfigModel | undefined>(undefined);

  private fetchData<T>(url: string, config: WritableSignal<T>) {
    return this.httpClient.get<T>(url).subscribe((response) => {
      config.set(response);
    });
  }

  getHeaderConfig() {
    this.fetchData(this.headerConfigUrl, this.headerConfig);
  }

  getHeroConfig() {
    this.fetchData(this.heroConfigUrl, this.heroConfig);
  }

  getSideMenuConfig() {
    this.fetchData(this.sideMenuConfigUrl, this.sideMenuConfig);
  }
}
