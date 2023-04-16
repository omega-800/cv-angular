import { Injectable } from '@angular/core';
import * as personData from 'src/data/person.json';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  people:Person[] = (personData as any).default;

  constructor() { }

  getPersonByName(name:string):Person {
    return Object.values(this.people).filter(person => person.firstname === name)[0];
  }

  getPeople():Person[] {
    return this.people;
  }
  
}
