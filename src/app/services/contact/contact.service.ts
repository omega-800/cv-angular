import { Injectable } from '@angular/core';
import * as contactData from 'src/data/contactpoint.json';
import { Contact, ContactEntity } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactsData:Contact[] = (contactData as any).default;
  contacts:ContactEntity[];

  constructor() { 
    this.contacts = this.contactsData.map(contact => {return {...contact, id:"contact_"+contact.contactpoint_id}})
  }

  getContactById(id:string):ContactEntity{
    return Object.values(this.contacts).filter(contact => contact.contactpoint_id === id)[0];
  }
}
