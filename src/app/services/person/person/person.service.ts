import { Injectable } from '@angular/core';
import * as personData from 'src/data/person.json';
import * as person_countryData from 'src/data/person_country.json';
import { PersonOnly, PersonEntity, Person_Country } from './person.model';
import { AddressEntity } from '../../address/address/address.model';
import { AddressService } from '../../address/address/address.service';
import { WorkplaceService } from '../../career/workplace/workplace.service';
import { SchoolService } from '../../career/school/school.service';
import { SchoolEntity } from '../../career/school/school.model';
import { WorkplaceEntity } from '../../career/workplace/workplace.model';
import { PersonCategoryService } from '../person-category/person-category.service';
import { CountryEntity } from '../../address/country/country.model';
import { ContactEntity } from '../../contact/contact.model';
import { PersonCategoryEntity } from '../person-category/person-category.model';
import { ContactService } from '../../contact/contact.service';
import { CountryService } from '../../address/country/country.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  onlyPeople:PersonOnly[] = (personData as any).default;
  personCountryLink:Person_Country[] = (person_countryData as any).default;
  people:PersonEntity[];

  constructor(addressService:AddressService, workplaceService:WorkplaceService, schoolService:SchoolService, personCategoryService:PersonCategoryService, contactService:ContactService, countryService:CountryService) { 
    this.people = this.onlyPeople.map(person => this.fillPerson(person, addressService, workplaceService, schoolService, personCategoryService, contactService, countryService))
  }

  getPersonByName(name:string):PersonEntity {
    return Object.values(this.people).filter(person => person.firstname === name)[0];
  }
  
  getPersonById(id:string):PersonEntity {
    return Object.values(this.people).filter(person => person.person_id === id)[0];
  }

  fillPerson(person:PersonOnly, addressService:AddressService, workplaceService:WorkplaceService, schoolService:SchoolService, personCategoryService:PersonCategoryService, contactService:ContactService, countryService:CountryService):PersonEntity {
    let address:AddressEntity = addressService.getAddressById(person.address_id);
    let workplace:WorkplaceEntity = workplaceService.getWorkplaceById(person.workplace_id);
    let school:SchoolEntity = schoolService.getSchoolById(person.school_id);
    let personcategory:PersonCategoryEntity = personCategoryService.getPersonCategoryById(person.personcategory_id);
    let contact:ContactEntity = contactService.getContactById(person.contactpoint_id);
    let countries:CountryEntity[] = this.personCountryLink.filter(link => link.person_id === person.person_id).map(link => countryService.getCountryById(link.country_id));
    return {...person, id: "person_"+person.person_id, name: person.firstname, address:address, workplace:workplace, school:school, personcategory:personcategory, contact: contact, countries:countries};
  }

  getPeople():PersonEntity[] {
    return this.people;
  }

  getAge(value: string):string{
    let date = new Date(value);
    let now = new Date();

    const startYear = date.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = now.getFullYear() - startYear;
    let monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = now.getDate() - date.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[date.getMonth()];
    }

    let hourDiff = now.getHours() - date.getHours();
    if (hourDiff < 0) {
      hourDiff += 24;
    }
    
    let minuteDiff = now.getMinutes() - date.getMinutes();
    if (minuteDiff < 0) {
      minuteDiff += 60;
    }
    
    let secDiff = now.getSeconds() - date.getSeconds();
    if (secDiff < 0) {
      secDiff += 60;
    }
    return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D ' + hourDiff + 'h ' + minuteDiff + 'm ' + secDiff + 's ';
  }
  
}
