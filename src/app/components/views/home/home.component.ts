import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person/person.service';
import { PersonEntity } from 'src/app/services/person/person.model';
import { LinkTypes, linkTypes } from 'src/app/components/components.model';
import { ContactEntity } from 'src/app/services/contact/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';
import { AgePipe } from 'src/app/pipes/age/age.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  me:PersonEntity;
  myContact:ContactEntity;
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
