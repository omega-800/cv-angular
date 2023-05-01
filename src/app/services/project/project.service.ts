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
  onlyProjects: ProjectOnly[] = (projectData as any).default;
  projectAuthorLinks: Project_Author[] = (projectAuthorData as any).default;
  projectSkillLinks: Project_Skill[] = (projectSkillData as any).default;

  projects: ProjectEntity[];

  constructor(personService: PersonService, workplaceService: WorkplaceService, skillService: SkillService, storage:AngularFireStorage) {
    //storage.ref('/projects/art/art/drawing/IMG-20180115-WA0008.jpeg').getDownloadURL().subscribe(val => console.log(val));
    //this.projects = this.onlyProjects.map(project => this.fillProject(project, personService, workplaceService, skillService, storage));
    this.projects = [];
    this.onlyProjects.map(project => this.getDownloadURLs(project, personService, workplaceService, skillService, storage));
    console.log(this.projects);
  }

  getProjects():ProjectEntity[] {
    console.log(this.projects);
    return this.projects;
  }
  
  getProjectById(id:string):ProjectEntity {
    return Object.values(this.projects).filter(project => project.project_id === id)[0];
  }

  getDownloadURLs(project: ProjectOnly, personService: PersonService, workplaceService: WorkplaceService, skillService: SkillService, storage:AngularFireStorage) {
    let images:ImageComponent[] = [];
    if(project.image !== ""){
    storage.ref('/'+project.image).listAll().subscribe({
      next: (list:ListResult) => {
        list.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url: string) => {
            //console.log(url);
            images.push({
              id:"image_"+itemRef.name,
              name:"Image of "+project.name,
              alt:"Image of "+project.name,
              path:url
            })
          });
        });
      }, 
      error: (e) => console.log(e),
      complete: () => {
        console.log(images)
        this.projects.push(this.fillProject(project, personService, workplaceService, skillService, images))
      }
    })
  }else {
    this.projects.push(this.fillProject(project, personService, workplaceService, skillService, [contactIcon]))
  }
  }

  fillProject(project: ProjectOnly, personService: PersonService, workplaceService: WorkplaceService, skillService: SkillService, images:ImageComponent[]): ProjectEntity {
    console.log(this.projects);
    return { 
      ...project, 
      client: personService.getPersonById(project.client_id), 
      workplace: workplaceService.getWorkplaceById(project.workplace_id), 
      authors: this.projectAuthorLinks.filter(link => link.project_id == project.project_id).map(link => personService.getPersonById(link.author_id)),
      skills: this.projectSkillLinks.filter(link => link.project_id == project.project_id).map(link => skillService.getSkillById(link.skill_id)),
      id: "project_"+project.project_id,
      date: new Date(),
      images: images
    }
  }
}
