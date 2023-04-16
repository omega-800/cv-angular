import { Component } from '@angular/core';
import { PersonService } from '../services/person/person.service';
import { Person } from '../services/person/person.model';
import { LinkTypes, linkTypes } from '../constants';
import { Contact } from '../services/contact/contact.model';
import { ContactService } from '../services/contact/contact.service';
import { AgePipe } from '../pipes/age/age.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  me:Person;
  myContact:Contact;
  lt:Readonly<LinkTypes>;
  //age:string;

  constructor(private personService:PersonService, private contactService:ContactService) { 
    this.me = this.personService.getPersonByName("Georgiy");
    this.myContact = this.contactService.getContactById(this.me.contactpoint_id);
    this.lt = linkTypes;
    //this.age = this.personService.getAge(this.me.birthdate);
    //setInterval(this.updateAge, 1000);
  }
/*
  updateAge(){
    this.age = this.personService.getAge(this.me.birthdate);
  }
  */
  ngOnInit():void {
  }
}
