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
import { FooterConfigModel } from '../assets/models/footer-config.model';
import { ConfigModel } from '../assets/models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private httpClient = inject(HttpClient);

  private appConfigUrl = 'assets/configs/config.json';
  private headerConfigUrl = 'assets/configs/header-config.json';
  private heroConfigUrl = 'assets/configs/hero-config.json';
  private sideMenuConfigUrl = 'assets/configs/side-menu-config.json';
  private footerConfigUrl = 'assets/configs/footer-config.json';

  appConfig = signal<ConfigModel | undefined>(undefined);
  headerConfig = signal<HeaderConfigModel | undefined>(undefined);
  heroConfig = signal<HeroConfigModel | undefined>(undefined);
  sideMenuConfig = signal<SideMenuConfigModel | undefined>(undefined);
  footerConfig = signal<FooterConfigModel | undefined>(undefined);

  private fetchData<T>(url: string, config: WritableSignal<T>) {
    return this.httpClient.get<T>(url).subscribe((response) => {
      config.set(response);
    });
  }

  getAppConfig() {
    this.fetchData(this.appConfigUrl, this.appConfig);
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

  getFooterConfig() {
    this.fetchData(this.footerConfigUrl, this.footerConfig);
  }
}
