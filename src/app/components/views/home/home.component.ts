import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonEntity } from 'src/app/services/person/person/person.model';
import { LinkTypes } from 'src/app/components/components.model';
import { PersonService } from 'src/app/services/person/person/person.service';
import { contactMail, contactPhone, openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SkillService } from 'src/app/services/skills/skill/skill.service';
import { AgePipe } from 'src/app/pipes/age/age.pipe';
import { ButtonComponent } from '../../general/button/button.component';
import { SkillsPercentComponent } from '../../general/skills/skills-percent/skills-percent.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'class': 'wrapper' },
  standalone: true,
  imports: [ButtonComponent, SkillsPercentComponent, AgePipe, NgIf, NgFor, TranslatePipe, AsyncPipe]
})
export class HomeComponent {
  me: PersonEntity = this.personService.getPersonByName('Georgiy');
  lt: Readonly<LinkTypes>;
  skills: SkillEntity[];

  mailText: string = '';
  age: Date = new Date();

  showFirst = true;
  mysteriousLinks = [
    "https://open.spotify.com/track/0i8ztWwkzwBJxviDMqYdMA?si=83fc4fb153514c54",
    "https://open.spotify.com/track/3B6bxYkDG7SH3T93rETpc1?si=e2136f3574fe4096",
    "https://open.spotify.com/track/3821fqXQU1myEolEYy8VRC?si=bf44b29c6f8a478b",
    "https://open.spotify.com/track/0DPXhtJlA7qKrq2CjAPuiP?si=b6b889f215394ff0",
    "https://open.spotify.com/track/5m1e0m3nIQ1lgxjZNm4I5z?si=ff92080664a44afc"
  ]

  text1 = 'Als leidenschaftlicher Problemlöser und kreativer Geist habe ich mir zum Ziel gesetzt, innovative Lösungen zu realisieren und durch ';
  text2 = 'jk just give me money plz. here are some ';
  btnText1 = 'meine Arbeit';
  btnText2 = 'cool reference projects';
  endText1 = ' einen positiven Einfluss zu hinterlassen. Sei es durch das Entwickeln von Applikationen mit Mehrwert, Wissensvermittlung an die kommenden Generationen oder das Kreieren von Kunstwerken, die die Menschen erreichen und erfreuen sollen.';
  endText2 = '\nok thx for ur attention.\n\nmy superpowers: adhd + autism\ndebuffs: bpd + existential dread';

  constructor(
    private personService: PersonService,
    private skillService: SkillService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.skills = this.skillService.getSkills();
    this.me = this.personService.getPersonByName('Georgiy');
    this.lt = linkTypes;
    this.getCurrentDate();
  }
  ngOnInit(): void { }
  mailMe = () => {
    contactMail(this.me.contact.email, this.me.gender, this.me.lastname);
  };
  callMe = () => {
    contactPhone(this.me.contact.phone);
  };
  myLink = () => {
    openLink(this.me.url);
  };
  myGithub = () => {
    openLink(this.me.github);
  };
  getCurrentDate() {
    setInterval(() => {
      this.age = new Date();
    }, 1000);
  }
  navigateProjects() {
    this.router.navigate(['../projects'], { relativeTo: this.activatedRoute, queryParamsHandling: "merge" });
  }
}
