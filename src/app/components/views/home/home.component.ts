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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'class': 'wrapper' },
  standalone: true,
  imports: [ButtonComponent, SkillsPercentComponent, AgePipe]
})
export class HomeComponent {
  me: PersonEntity = this.personService.getPersonByName('Georgiy');
  lt: Readonly<LinkTypes>;
  skills: SkillEntity[];

  mailText: string = '';
  age: Date = new Date();

  constructor(
    private personService: PersonService,
    private skillService: SkillService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
