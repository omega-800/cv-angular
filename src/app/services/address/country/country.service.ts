import { Injectable } from '@angular/core';
import * as countryData from 'src/data/country.json';
import { CountryEntity, CountryOnly } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  onlyCountries:CountryOnly[] = (countryData as any).default;
  countries:CountryEntity[];

  constructor() { 
    this.countries = this.onlyCountries.map(country => {return {...country, id: "country_"+country.country_id}})
  }

  getCountryById(id:string):CountryEntity {
    return Object.values(this.countries).filter(country => country.country_id === id)[0];
  }
}
