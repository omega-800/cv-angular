import { Injectable } from '@angular/core';
import { Language } from './language.model';
import * as languageData from 'src/data/language.json'

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  languages:Language[] = (languageData as any).default;

  constructor() { }

  getLanguages():Language[] {
    return this.languages;
  }

  getLanguageById(id:string):Language {
    return Object.values(this.languages).filter(language => language.language_id === id)[0];
  }
}
