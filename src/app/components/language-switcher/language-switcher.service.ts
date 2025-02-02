import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import key from './apiKey';
import { HeaderConfigModel } from '../../../assets/models/header-config.model';
import { SideMenuConfigModel } from '../../../assets/models/side-menu-config.model';
import { HeroConfigModel } from '../../../assets/models/hero-config.model';
import { FooterConfigModel } from '../../../assets/models/footer-config.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitcherService {
  private httpClient = inject(HttpClient);
  private url = 'https://translation.googleapis.com/language/translate/v2?key=';
  private key = key;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  translate(
    dataHeader: Signal<HeaderConfigModel>,
    dataSideMenu: Signal<SideMenuConfigModel>,
    dataHero: Signal<HeroConfigModel>,
    dataFooter: Signal<FooterConfigModel>,
    language: string
  ) {
    const cacheKey = `translation_${language}`;
    const cachedTranslation = localStorage.getItem(cacheKey);

    this.loadingSubject.next(true);
    this.errorMessageSubject.next(null); // Resetăm eroarea

    if (cachedTranslation) {
      setTimeout(() => {
        this.applyTranslation(
          JSON.parse(cachedTranslation),
          dataHeader,
          dataSideMenu,
          dataHero,
          dataFooter
        );
        this.loadingSubject.next(false);
      }, 2000);
      return;
    }

    const textToTranslate = [
      ...this.makeItString(dataHeader()),
      ...this.makeItString2(dataSideMenu()),
      ...this.makeItString3(dataHero()),
      ...this.makeItString4(dataFooter()),
    ];

    const startTime = Date.now();

    this.httpClient
      .post<{
        data: { translations: { translatedText: string }[] };
      }>(this.url + this.key, { q: textToTranslate, target: language })
      .subscribe({
        next: (response) => {
          if (!response?.data?.translations?.length) {
            this.handleError('Nu s-au primit date valide de la API.');
            return;
          }

          const translatedStrings = response.data.translations.map((t) =>
            t.translatedText.replace('&#39;', "'")
          );

          const translatedData = this.processTranslation(
            translatedStrings,
            dataHeader,
            dataSideMenu,
            dataHero,
            dataFooter
          );

          localStorage.setItem(cacheKey, JSON.stringify(translatedData));

          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 2000 - elapsedTime);

          setTimeout(() => {
            this.applyTranslation(
              translatedData,
              dataHeader,
              dataSideMenu,
              dataHero,
              dataFooter
            );
            this.loadingSubject.next(false);
          }, remainingTime);
        },
        error: () => {
          this.handleError(
            'Eroare la traducere! Verifică conexiunea la internet.'
          );
        },
      });
  }

  private handleError(message: string) {
    this.errorMessageSubject.next(message);
    this.loadingSubject.next(false);
    setTimeout(() => this.errorMessageSubject.next(null), 5000); // Ascunde eroarea după 5 secunde
  }

  private processTranslation(
    translatedStrings: string[],
    dataHeader: Signal<HeaderConfigModel>,
    dataSideMenu: Signal<SideMenuConfigModel>,
    dataHero: Signal<HeroConfigModel>,
    dataFooter: Signal<FooterConfigModel>
  ) {
    const headerStringsCount = this.makeItString(dataHeader()).length;
    const sideMenuStringsCount = this.makeItString2(dataSideMenu()).length;
    const heroStringsCount = this.makeItString3(dataHero()).length;
    const footerStringsCount = this.makeItString4(dataFooter()).length;

    return {
      header: this.makeItObject(
        translatedStrings.splice(0, headerStringsCount),
        dataHeader()
      ),
      sideMenu: this.makeItObject2(
        translatedStrings.splice(0, sideMenuStringsCount),
        dataSideMenu()
      ),
      hero: this.makeItObject3(
        translatedStrings.splice(0, heroStringsCount),
        dataHero()
      ),
      footer: this.makeItObject4(
        translatedStrings.splice(0, footerStringsCount),
        dataFooter()
      ),
    };
  }

  private applyTranslation(
    translatedData: any,
    dataHeader: Signal<HeaderConfigModel>,
    dataSideMenu: Signal<SideMenuConfigModel>,
    dataHero: Signal<HeroConfigModel>,
    dataFooter: Signal<FooterConfigModel>
  ) {
    dataHeader().company.name.title = translatedData.header.company.name.title;
    dataHeader().menu = translatedData.header.menu;

    dataSideMenu().title = translatedData.sideMenu.title;
    dataSideMenu().links = translatedData.sideMenu.links;

    dataHero().title = translatedData.hero.title;
    dataHero().description = translatedData.hero.description;
    dataHero().button1 = translatedData.hero.button1;
    dataHero().button2 = translatedData.hero.button2;

    dataFooter().title = translatedData.footer.title;
    dataFooter().about.title = translatedData.footer.about.title;
    dataFooter().about.description = translatedData.footer.about.description;
    dataFooter().links.title = translatedData.footer.links.title;
    dataFooter().links.links = translatedData.footer.links.links;
    dataFooter().form.title = translatedData.footer.form.title;
    dataFooter().form.mailPlaceholder =
      translatedData.footer.form.mailPlaceholder;
    dataFooter().form.messagePlaceholder =
      translatedData.footer.form.messagePlaceholder;
    dataFooter().form.buttonPlaceholder =
      translatedData.footer.form.buttonPlaceholder;
  }

  makeItString4(config: FooterConfigModel): string[] {
    return [
      config.title,
      config.about.title,
      config.about.description,
      config.links.title,
      ...config.links.links,
      config.form.title,
      config.form.mailPlaceholder,
      config.form.messagePlaceholder,
      config.form.buttonPlaceholder,
    ];
  }

  makeItObject4(
    data: string[],
    originalConfig: FooterConfigModel
  ): FooterConfigModel {
    return {
      ...originalConfig,
      title: data.shift() || originalConfig.title,
      about: {
        ...originalConfig.about,
        title: data.shift() || originalConfig.about.title,
        description: data.shift() || originalConfig.about.description,
      },
      links: {
        ...originalConfig.links,
        title: data.shift() || originalConfig.links.title,
        links: originalConfig.links.links.map(() => data.shift() || ''),
      },
      form: {
        ...originalConfig.form,
        title: data.shift() || originalConfig.form.title,
        mailPlaceholder: data.shift() || originalConfig.form.mailPlaceholder,
        messagePlaceholder:
          data.shift() || originalConfig.form.messagePlaceholder,
        buttonPlaceholder:
          data.shift() || originalConfig.form.buttonPlaceholder,
      },
    };
  }

  makeItString3(config: HeroConfigModel): string[] {
    return [config.title, config.description, config.button1, config.button2];
  }

  makeItObject3(
    data: string[],
    originalConfig: HeroConfigModel
  ): HeroConfigModel {
    return {
      ...originalConfig,
      title: data.shift() || originalConfig.title,
      description: data.shift() || originalConfig.description,
      button1: data.shift() || originalConfig.button1,
      button2: data.shift() || originalConfig.button2,
    };
  }

  makeItString2(config: SideMenuConfigModel): string[] {
    return [
      config.title,
      ...config.links.flatMap((link) => [
        link.title,
        ...(link.miniTitles || []),
      ]),
    ];
  }

  makeItObject2(
    data: string[],
    originalConfig: SideMenuConfigModel
  ): SideMenuConfigModel {
    return {
      ...originalConfig,
      title: data.shift() || '',
      links: originalConfig.links.map((link) => ({
        ...link,
        title: data.shift() || '',
        miniTitles: link.miniTitles?.map(() => data.shift() || '') || [],
      })),
    };
  }

  makeItString(config: HeaderConfigModel): string[] {
    return config.company.name.show
      ? [
          config.company.name.title,
          ...config.menu.flatMap((menuItem) => [
            menuItem.link,
            ...(menuItem.links || []),
          ]),
        ]
      : [
          ...config.menu.flatMap((menuItem) => [
            menuItem.link,
            ...(menuItem.links || []),
          ]),
        ];
  }

  makeItObject(
    data: string[],
    originalConfig: HeaderConfigModel
  ): HeaderConfigModel {
    return {
      ...originalConfig,
      company: {
        ...originalConfig.company,
        name: {
          ...originalConfig.company.name,
          title: originalConfig.company.name.show
            ? data.shift() || originalConfig.company.name.title
            : originalConfig.company.name.title,
        },
      },
      menu: originalConfig.menu.map((menuItem) => ({
        ...menuItem,
        link: data.shift() || '',
        links: menuItem.links?.map(() => data.shift() || '') || [],
      })),
    };
  }
}
