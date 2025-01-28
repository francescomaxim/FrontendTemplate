import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import key from './apiKey';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitcherService {
  private httpClient = inject(HttpClient);

  private url = 'https://translation.googleapis.com/language/translate/v2?key=';
  private key = key;

  // translate(data: Signal<HeaderModel>, language: string) {
  //   // this.httpClient
  //   //   .post<{
  //   //     data: {
  //   //       translations: {
  //   //         translatedText: string;
  //   //       }[];
  //   //     };
  //   //   }>(this.url + this.key, {
  //   //     q: [data().title],
  //   //     target: language,
  //   //   })
  //   //   .subscribe((response) => {
  //   //     console.log(response);
  //   //     data().title = response.data.translations[0].translatedText;
  //   //   });
  // }
}
