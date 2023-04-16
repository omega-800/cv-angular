import { Component } from '@angular/core';
import { PersonService } from '../services/person/person.service';
import { Person } from '../services/person/person.model';
import { LinkTypes, linkTypes } from '../constants';
import { Contact } from '../services/contact/contact.model';
import { ContactService } from '../services/contact/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  me:Person;
  myContact:Contact;
  lt:Readonly<LinkTypes>;

  constructor(private personService:PersonService, private contactService:ContactService) { 
    this.me = this.personService.getPersonByName("Georgiy");
    this.myContact = this.contactService.getContactById(this.me.contactpoint_id);
    this.lt = linkTypes;
  }
  
  ngOnInit():void {
  }
}
