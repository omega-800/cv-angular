import { Component } from '@angular/core';
import { PersonEntity } from 'src/app/services/person/person/person.model';
import { ImageComponent, LinkTypes, linkTypes } from 'src/app/components/components.model';
import { ContactEntity } from 'src/app/services/contact/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';
import { AgePipe } from 'src/app/pipes/age/age.pipe';
import { PersonService } from 'src/app/services/person/person/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  me:PersonEntity;
  lt:Readonly<LinkTypes>;
  image:ImageComponent;
  //age:string;

  constructor(private personService:PersonService) { 
    this.me = this.personService.getPersonByName("Georgiy");
    this.lt = linkTypes;
    this.image = {
      id:"home_profilepic",
      name:"profilePic",
      path: `/assets/${this.me.image}`,
      alt:"Profile picture"
    }
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
