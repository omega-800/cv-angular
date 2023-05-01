import { Injectable } from '@angular/core';
import * as projectData from 'src/data/project.json'
import * as projectAuthorData from 'src/data/project_author.json'
import * as projectSkillData from 'src/data/project_skill.json'
import * as images from 'src/assets/fileStructure.json'
import { ProjectEntity, ProjectOnly, Project_Author, Project_Skill } from './project.model';
import { PersonService } from '../person/person/person.service';
import { CareerService } from '../career/career/career.service';
import { SkillService } from '../skills/skill/skill.service';
import { WorkplaceService } from '../career/workplace/workplace.service';
import { PersonEntity } from '../person/person/person.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageComponent } from "src/app/components/components.model";
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { Observable } from 'rxjs';
import { getStorage, ref, listAll } from "firebase/storage";
import { contactIcon } from 'src/app/components/components.constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private onlyProjects: ProjectOnly[] = (projectData as any).default;
  private projectAuthorLinks: Project_Author[] = (projectAuthorData as any).default;
  private projectSkillLinks: Project_Skill[] = (projectSkillData as any).default;

  private projects: ProjectEntity[];

  constructor(private personService: PersonService, private workplaceService: WorkplaceService, private skillService: SkillService, private storage:AngularFireStorage) {
    this.projects = this.onlyProjects.map(project => this.fillProject(project, []));
  }

  getProjects():ProjectEntity[] {
    return this.projects;
  }
  
  getProjectById(id:string):ProjectEntity {
    return Object.values(this.projects).filter(project => project.project_id === id)[0];
  }

  fillProject(project: ProjectOnly, images:ImageComponent[]): ProjectEntity {
    return { 
      ...project, 
      client: this.personService.getPersonById(project.client_id), 
      workplace: this.workplaceService.getWorkplaceById(project.workplace_id), 
      authors: this.projectAuthorLinks.filter(link => link.project_id == project.project_id).map(link => this.personService.getPersonById(link.author_id)),
      skills: this.projectSkillLinks.filter(link => link.project_id == project.project_id).map(link => this.skillService.getSkillById(link.skill_id)),
      id: "project_"+project.project_id,
      date: new Date(),
      images: images
    }
  }
}
