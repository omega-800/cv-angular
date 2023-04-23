import { Injectable } from '@angular/core';
import * as careerData from 'src/data/career.json';
import { CareerEntity, CareerOnly, careerTypes } from './career.model';
import { WorkplaceService } from '../workplace/workplace.service';
import { isNgTemplate } from '@angular/compiler';
import { SchoolService } from '../school/school.service';
import { SchoolEntity } from '../school/school.model';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  onlyCareers:CareerOnly[] = (careerData as any).default;
  careers:CareerEntity[];

  constructor(workplaceService:WorkplaceService, schoolService:SchoolService) { 
    this.careers = this.onlyCareers.map(item => this.fillCareer(item, workplaceService, schoolService))
  }

  fillCareer(career:CareerOnly, workplaceService:WorkplaceService, schoolService:SchoolService):CareerEntity {
    if(career.workplace_id !== ""){
      return {...career, id:"career_"+career.career_id, workplace:workplaceService.getWorkplaceById(career.workplace_id), type:careerTypes.WORK}
    }
    if(career.school_id !== ""){
      let school:SchoolEntity = schoolService.getSchoolById(career.school_id);
      return {...career, id:"career_"+career.career_id, school:school, type:careerTypes.SCHOOL, description:school.type}
    }
    return {...career, id:career.career_id, type:careerTypes.OTHER}
  }
  
  getCareerById(id:string):CareerEntity {
    return Object.values(this.careers).filter(career => career.career_id === id)[0];
  }

  getCareers():CareerEntity[] {
    return this.careers;
  }

}
