import { Injectable } from '@angular/core';
import * as contactData from 'src/data/contactpoint.json';
import { ContactOnly, ContactEntity } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private onlyContacts: ContactOnly[] = (contactData as any).default;
  private contacts: ContactEntity[];

  constructor() {
    this.contacts = this.onlyContacts.map((contact) => {
      return { ...contact, id: 'contact_' + contact.contactpoint_id };
    });
  }

  getContactById(id: string): ContactEntity {
    return Object.values(this.contacts).filter(
      (contact) => contact.contactpoint_id === id
    )[0];
  }
}
