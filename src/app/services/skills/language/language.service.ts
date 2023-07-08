import { Injectable } from '@angular/core';
import { LanguageOnly, LanguageEntity } from './language.model';
import * as languageData from 'src/data/language.json';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private onlyLanguages: LanguageOnly[] = (languageData as any).default;
  private languages: LanguageEntity[];

  constructor() {
    this.languages = this.onlyLanguages.map((language) => {
      return {
        ...language,
        id: 'language_' + language.language_id,
        image: {
          id: 'image_' + language.language_id,
          name: 'Image of ' + language.name,
          alt: 'Image of ' + language.name,
          path: language.image,
        },
        thumbnail: {
          id: 'thumbnail_' + language.language_id,
          name: 'Thumbnail of ' + language.name,
          alt: 'Thumbnail of ' + language.name,
          path: language.thumbnail,
        },
      };
    });
  }

  getLanguages(): LanguageEntity[] {
    return this.languages;
  }

  getLanguageById(id: string): LanguageEntity {
    return Object.values(this.languages).filter(
      (language) => language.language_id === id
    )[0];
  }
}
