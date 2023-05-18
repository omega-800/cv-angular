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
  private onlyPeople: PersonOnly[] = (personData as any).default;
  private personCountryLink: Person_Country[] = (person_countryData as any).default;
  private people: PersonEntity[];

  constructor(private addressService: AddressService, private workplaceService: WorkplaceService, private schoolService: SchoolService, private personCategoryService: PersonCategoryService, private contactService: ContactService, private countryService: CountryService) {
    this.people = this.onlyPeople.map(person => this.fillPerson(person))
  }

  getPersonByName(name: string): PersonEntity {
    return Object.values(this.people).filter(person => person.firstname === name)[0];
  }

  getPersonById(id: string): PersonEntity {
    return Object.values(this.people).filter(person => person.person_id === id)[0];
  }

  fillPerson(person: PersonOnly): PersonEntity {
    let address: AddressEntity = this.addressService.getAddressById(person.address_id);
    let workplace: WorkplaceEntity = this.workplaceService.getWorkplaceById(person.workplace_id);
    let school: SchoolEntity = this.schoolService.getSchoolById(person.school_id);
    let personcategory: PersonCategoryEntity = this.personCategoryService.getPersonCategoryById(person.personcategory_id);
    let contact: ContactEntity = this.contactService.getContactById(person.contactpoint_id);
    let countries: CountryEntity[] = this.personCountryLink.filter(link => link.person_id === person.person_id).map(link => this.countryService.getCountryById(link.country_id));
    return { ...person, id: "person_" + person.person_id, name: person.firstname, address: address, workplace: workplace, school: school, personcategory: personcategory, contact: contact, countries: countries };
  }

  getPeople(): PersonEntity[] {
    return this.people;
  }
}
