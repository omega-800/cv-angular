import { Injectable } from '@angular/core';
import { LanguageOnly, LanguageEntity } from './language.model';
import * as languageData from 'src/data/language.json'

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private onlyLanguages: LanguageOnly[] = (languageData as any).default;
  private languages: LanguageEntity[];

  constructor() {
    this.languages = this.onlyLanguages.map(language => { return { ...language, id: "language_" + language.language_id } })
  }

  getLanguages(): LanguageEntity[] {
    return this.languages;
  }

  getLanguageById(id: string): LanguageEntity {
    return Object.values(this.languages).filter(language => language.language_id === id)[0];
  }
}
