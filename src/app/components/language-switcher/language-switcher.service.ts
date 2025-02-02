import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import key from './apiKey';
import { HeaderConfigModel } from '../../../assets/models/header-config.model';
import { SideMenuConfigModel } from '../../../assets/models/side-menu-config.model';
import { HeroConfigModel } from '../../../assets/models/hero-config.model';
import { FooterConfigModel } from '../../../assets/models/footer-config.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitcherService {
  private httpClient = inject(HttpClient);

  private url = 'https://translation.googleapis.com/language/translate/v2?key=';
  private key = key;

  translate(
    dataHeader: Signal<HeaderConfigModel>,
    dataSideMenu: Signal<SideMenuConfigModel>,
    dataHero: Signal<HeroConfigModel>,
    dataFooter: Signal<FooterConfigModel>,
    language: string
  ) {
    // Combinăm toate textele într-un singur array
    const textToTranslate = [
      ...this.makeItString(dataHeader()),
      ...this.makeItString2(dataSideMenu()),
      ...this.makeItString3(dataHero()),
      ...this.makeItString4(dataFooter()),
    ];

    console.log(this.makeItString3(dataHero()));

    this.httpClient
      .post<{
        data: {
          translations: {
            translatedText: string;
          }[];
        };
      }>(this.url + this.key, {
        q: textToTranslate,
        target: language,
      })
      .subscribe((response) => {
        console.log(response);

        // Extragem vectorul de string-uri traduse
        const translatedStrings = response.data.translations.map((t) => {
          t.translatedText = t.translatedText.replace('&#39;', "'");
          return t.translatedText;
        });

        // Determinăm numărul de string-uri pentru fiecare model
        const headerStringsCount = this.makeItString(dataHeader()).length;
        const sideMenuStringsCount = this.makeItString2(dataSideMenu()).length;
        const heroStringsCount = this.makeItString3(dataHero()).length;
        const footerStringsCount = this.makeItString4(dataFooter()).length;

        // Extragem traducerile pentru fiecare obiect
        const headerTranslatedStrings = translatedStrings.splice(
          0,
          headerStringsCount
        );
        const sideMenuTranslatedStrings = translatedStrings.splice(
          0,
          sideMenuStringsCount
        );
        const heroTranslatedStrings = translatedStrings.splice(
          0,
          heroStringsCount
        );
        const footerTranslatedStrings = translatedStrings.splice(
          0,
          footerStringsCount
        );

        // Reconstruim obiectele traduse
        const translatedHeaderConfig = this.makeItObject(
          headerTranslatedStrings,
          dataHeader()
        );
        const translatedSideMenuConfig = this.makeItObject2(
          sideMenuTranslatedStrings,
          dataSideMenu()
        );
        const translatedHeroConfig = this.makeItObject3(
          heroTranslatedStrings,
          dataHero()
        );
        const translatedFooterConfig = this.makeItObject4(
          footerTranslatedStrings,
          dataFooter()
        );

        // Actualizăm datele cu noile configurații traduse
        dataHeader().company.name.title =
          translatedHeaderConfig.company.name.title;
        dataHeader().menu = translatedHeaderConfig.menu;

        dataSideMenu().title = translatedSideMenuConfig.title;
        dataSideMenu().links = translatedSideMenuConfig.links;

        dataHero().title = translatedHeroConfig.title;
        dataHero().description = translatedHeroConfig.description;
        dataHero().button1 = translatedHeroConfig.button1;
        dataHero().button2 = translatedHeroConfig.button2;

        dataFooter().title = translatedFooterConfig.title;
        dataFooter().about.title = translatedFooterConfig.about.title;
        dataFooter().about.description =
          translatedFooterConfig.about.description;
        dataFooter().links.title = translatedFooterConfig.links.title;
        dataFooter().links.links = translatedFooterConfig.links.links;
        dataFooter().form.title = translatedFooterConfig.form.title;
        dataFooter().form.mailPlaceholder =
          translatedFooterConfig.form.mailPlaceholder;
        dataFooter().form.messagePlaceholder =
          translatedFooterConfig.form.messagePlaceholder;
        dataFooter().form.buttonPlaceholder =
          translatedFooterConfig.form.buttonPlaceholder;
      });
  }

  makeItString4(config: FooterConfigModel): string[] {
    const result: string[] = [];

    // Adaugă titlul principal
    result.push(config.title);

    // Adaugă titlul și descrierea din secțiunea "about"
    result.push(config.about.title);
    result.push(config.about.description);

    // Adaugă titlul link-urilor și link-urile efective
    result.push(config.links.title);
    result.push(...config.links.links);

    // Adaugă titlurile și placeholder-ele formularului
    result.push(config.form.title);
    result.push(config.form.mailPlaceholder);
    result.push(config.form.messagePlaceholder);
    result.push(config.form.buttonPlaceholder);

    return result;
  }

  makeItObject4(
    data: string[],
    originalConfig: FooterConfigModel
  ): FooterConfigModel {
    return {
      metaData: {
        fixed: originalConfig.metaData.fixed,
        transparent: originalConfig.metaData.transparent,
      },

      title: data.shift() || originalConfig.title,

      style: originalConfig.style, // Păstrăm stilul neschimbat

      about: {
        title: data.shift() || originalConfig.about.title,
        description: data.shift() || originalConfig.about.description,
        phone: originalConfig.about.phone, // Păstrăm phone neschimbat
        email: originalConfig.about.email, // Păstrăm email neschimbat
      },

      links: {
        title: data.shift() || originalConfig.links.title,
        links: originalConfig.links.links.map(() => data.shift() || ''),
      },

      form: {
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
      title: data.shift() || originalConfig.title, // Extrage titlul
      description: data.shift() || originalConfig.description, // Extrage descrierea
      button1: data.shift() || originalConfig.button1, // Extrage textul primului buton
      button2: data.shift() || originalConfig.button2, // Extrage textul celui de-al doilea buton
    };
  }

  makeItString2(config: SideMenuConfigModel): string[] {
    const result: string[] = [];

    // Adaugă titlul meniului
    result.push(config.title);

    // Adaugă titlurile link-urilor și mini-titlurile
    config.links.forEach((link) => {
      result.push(link.title);
      if (link.miniTitles != undefined) {
        result.push(...link.miniTitles);
      }
    });

    return result;
  }

  makeItObject2(
    data: string[],
    originalConfig: SideMenuConfigModel
  ): SideMenuConfigModel {
    const newConfig: SideMenuConfigModel = {
      title: data.shift() || '', // Extrage titlul meniului
      links: [],
    };

    originalConfig.links.forEach((link) => {
      const newLink = {
        icon: link.icon, // Păstrăm icon-ul neschimbat
        title: data.shift() || '', // Extrage titlul link-ului
        miniTitles:
          link.miniTitles != undefined
            ? link.miniTitles.map(() => data.shift() || '')
            : [], // Extrage mini-titlurile
      };
      newConfig.links.push(newLink);
    });

    return newConfig;
  }

  makeItString(config: HeaderConfigModel): string[] {
    const result: string[] = [];

    // Adaugă titlul companiei dacă este vizibil
    if (config.company.name.show) {
      result.push(config.company.name.title);
    }

    // Adaugă linkurile din meniu și sublinkurile
    config.menu.forEach((menuItem) => {
      result.push(menuItem.link);
      if (menuItem.links != undefined) {
        result.push(...menuItem.links);
      }
    });

    return result;
  }

  makeItObject(
    data: string[],
    originalConfig: HeaderConfigModel
  ): HeaderConfigModel {
    const newConfig: HeaderConfigModel = {
      metaData: {
        fixed: originalConfig.metaData.fixed,
        transparent: originalConfig.metaData.transparent,
      },
      company: {
        name: {
          show: originalConfig.company.name.show,
          title: originalConfig.company.name.show
            ? data.shift() || ''
            : originalConfig.company.name.title,
        },
        logo: { ...originalConfig.company.logo },
      },
      menu: [],
    };

    originalConfig.menu.forEach((menuItem) => {
      const newMenuItem = {
        link: data.shift() || '', // Extrage link-ul principal
        links:
          menuItem.links != undefined
            ? menuItem.links.map(() => data.shift() || '')
            : [], // Extrage sublink-urile
      };
      newConfig.menu.push(newMenuItem);
    });

    return newConfig;
  }
}
