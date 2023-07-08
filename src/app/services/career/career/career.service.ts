import { Injectable } from '@angular/core';
import * as careerData from 'src/data/career.json';
import * as careerSkillData from 'src/data/career_skill.json';
import {
  CareerEntity,
  CareerOnly,
  careerTypes,
  Career_Skill,
} from './career.model';
import { WorkplaceService } from '../workplace/workplace.service';
import { SchoolService } from '../school/school.service';
import { SchoolEntity } from '../school/school.model';
import { SkillService } from '../../skills/skill/skill.service';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  private onlyCareers: CareerOnly[] = (careerData as any).default;
  private careerSkillLinks: Career_Skill[] = (careerSkillData as any).default;
  private careers: CareerEntity[];

  constructor(
    private workplaceService: WorkplaceService,
    private schoolService: SchoolService,
    private skillService: SkillService
  ) {
    this.careers = this.onlyCareers.map((item) => this.fillCareer(item));
  }

  fillCareer(career: CareerOnly): CareerEntity {
    if (career.workplace_id !== '') {
      return {
        ...career,
        id: 'career_' + career.career_id,
        workplace: this.workplaceService.getWorkplaceById(career.workplace_id),
        type: careerTypes.WORK,
        skills: this.careerSkillLinks
          .filter((link) => link.career_id == career.career_id)
          .map((link) => {
            return {
              ...this.skillService.getSkillById(link.skill_id),
              knowledgepercent: link.percent,
            };
          }),
      };
    }
    if (career.school_id !== '') {
      let school: SchoolEntity = this.schoolService.getSchoolById(
        career.school_id
      );
      return {
        ...career,
        id: 'career_' + career.career_id,
        school: school,
        type: careerTypes.SCHOOL,
        description: school.type,
        skills: this.careerSkillLinks
          .filter((link) => link.career_id == career.career_id)
          .map((link) => {
            return {
              ...this.skillService.getSkillById(link.skill_id),
              knowledgepercent: link.percent,
            };
          }),
      };
    }
    return {
      ...career,
      id: career.career_id,
      type: careerTypes.OTHER,
      skills: this.careerSkillLinks
        .filter((link) => link.career_id == career.career_id)
        .map((link) => {
          return {
            ...this.skillService.getSkillById(link.skill_id),
            knowledgepercent: link.percent,
          };
        }),
    };
  }

  getCareerById(id: string): CareerEntity {
    return Object.values(this.careers).filter(
      (career) => career.career_id === id
    )[0];
  }

  getCareers(): CareerEntity[] {
    return this.careers;
  }
}
