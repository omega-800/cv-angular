import { Component } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project.model';
import { ProjectService } from 'src/app/services/project/project.service';
import { openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { LinkTypes } from '../../components.model';
import { CareerEntity } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { PersonService } from 'src/app/services/person/person/person.service';
import { PersonEntity } from 'src/app/services/person/person/person.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects:ProjectEntity[];
  lt:LinkTypes=linkTypes;

  constructor(private projectService:ProjectService, private careerService: CareerService, private personService: PersonService) {
    this.projects = projectService.getProjects();
    //this.projects = [projectService.getProjectById("60d8c8bc-3061-406c-80bf-6188a236a7c1")];
  }

  ol = (href:string) => {
    return () => openLink(href);
  }

  openCareer = (id:string) => {
    let career:CareerEntity = this.careerService.getCareerById(id);
    return () => openLink("/careers/"+career.name);
  }

  openClient = (id:string) => {
    let person:PersonEntity = this.personService.getPersonById(id);
    return () => openLink("/careers/"+person.name);
  }
}
