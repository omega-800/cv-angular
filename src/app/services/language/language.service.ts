import { Injectable } from '@angular/core';
import { Language, LanguageEntity } from './language.model';
import * as languageData from 'src/data/language.json'

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  languagesData:Language[] = (languageData as any).default;
  languages:LanguageEntity[];

  constructor() { 
    this.languages = this.languagesData.map(language => {return {...language, id:"language_"+language.language_id}}) 
  }

  getLanguages():LanguageEntity[] {
    return this.languages;
  }

  getLanguageById(id:string):LanguageEntity {
    return Object.values(this.languages).filter(language => language.language_id === id)[0];
  }
}
