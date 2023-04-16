import { Component } from '@angular/core';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill } from 'src/app/services/skill/skill.model';

@Component({
  selector: 'app-skills-percent-list',
  templateUrl: './skills-percent-list.component.html',
  styleUrls: ['./skills-percent-list.component.scss']
})
export class SkillsPercentListComponent {
  allSkills:{ [key:string]: Skill[] } = {};

  constructor(private skillService:SkillService) { 
    this.skillService.getSkillTypes().forEach(type => {
      this.allSkills[type] = this.skillService.getSkillsByType(type);
    });
  }

  
}
