import { Injectable } from '@angular/core';
import * as contactData from 'src/data/contactpoint.json';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts:Contact[] = (contactData as any).default;

  constructor() { }

  getContactById(id:string):Contact{
    return Object.values(this.contacts).filter(contact => contact.contactpoint_id === id)[0];
  }
}
