import { Injectable } from '@angular/core';
import * as projectData from 'src/data/project.json'
import * as projectAuthorData from 'src/data/project_author.json'
import * as projectSkillData from 'src/data/project_skill.json'
import { ProjectEntity, ProjectOnly, Project_Author, Project_Skill } from './project.model';
import { PersonService } from '../person/person/person.service';
import { CareerService } from '../career/career/career.service';
import { SkillService } from '../skills/skill/skill.service';
import { WorkplaceService } from '../career/workplace/workplace.service';
import { PersonEntity } from '../person/person/person.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  onlyProjects: ProjectOnly[] = (projectData as any).default;
  projectAuthorLinks: Project_Author[] = (projectAuthorData as any).default;
  projectSkillLinks: Project_Skill[] = (projectSkillData as any).default;

  projects: ProjectEntity[];

  constructor(personService: PersonService, workplaceService: WorkplaceService, skillService: SkillService) {
    this.projects = this.onlyProjects.map(project => this.fillProject(project, personService, workplaceService, skillService));
  }
  
  getProjectById(id:string):ProjectEntity {
    return Object.values(this.projects).filter(project => project.project_id === id)[0];
  }

  fillProject(project: ProjectOnly, personService: PersonService, workplaceService: WorkplaceService, skillService: SkillService): ProjectEntity {
    return { 
      ...project, 
      client: personService.getPersonById(project.client_id), 
      workplace: workplaceService.getWorkplaceById(project.workplace_id), 
      authors: this.projectAuthorLinks.filter(link => link.project_id == project.project_id).map(link => personService.getPersonById(link.author_id)),
      skills: this.projectSkillLinks.filter(link => link.project_id == project.project_id).map(link => skillService.getSkillById(link.skill_id)),
      id: project.project_id 
    }
  }
}
