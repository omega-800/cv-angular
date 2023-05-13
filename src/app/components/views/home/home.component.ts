import { Component } from '@angular/core';
import { PersonEntity } from 'src/app/services/person/person/person.model';
import { ImageComp, LinkTypes } from 'src/app/components/components.model';
import { ContactEntity } from 'src/app/services/contact/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';
import { AgePipe } from 'src/app/pipes/age/age.pipe';
import { PersonService } from 'src/app/services/person/person/person.service';
import { contactMail, contactPhone, openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SkillService } from 'src/app/services/skills/skill/skill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  me:PersonEntity = this.personService.getPersonByName("Georgiy");
  lt:Readonly<LinkTypes>;
  image:ImageComp;
  skills:SkillEntity[];

  mailText:string = "";
  //age:string;

  constructor(private personService:PersonService, private skillService:SkillService) { 
    this.skills = this.skillService.getSkills();
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
  mailMe = () => {
    return contactMail(this.me.contact.email, this.me.gender, this.me.lastname);
  }
  callMe = () => {
    return contactPhone(this.me.contact.phone);
  }
  myLink = () => {
    return openLink(this.me.url);
  }
  myGithub = () => {
    return openLink(this.me.github);
  }
}
