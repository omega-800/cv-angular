import { Component } from '@angular/core';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill, SkillOnly, SkillSubCategory } from 'src/app/services/skill/skill.model';

@Component({
  selector: 'app-skills-percent-list',
  templateUrl: './skills-percent-list.component.html',
  styleUrls: ['./skills-percent-list.component.scss']
})
export class SkillsPercentListComponent {
  //allSkills:{ [key:string]: Skill[] } = {};
  //types:string[];
  types:{[key:string]:string};
  allSkillSubCategories:SkillSubCategory[];
  allOnlySkills:SkillOnly[];

  constructor(private skillService:SkillService) { 
    /*this.skillService.getSkillTypes().forEach(type => {
      this.allSkills[type] = this.skillService.getSkillsByType(type);
    });
    this.types = this.skillService.getSkillTypes();*/
    this.types = this.skillService.getSkillTypes();
    this.allOnlySkills = this.skillService.getOnlySkills();
    this.allSkillSubCategories = this.skillService.getSkillSubCategories();
  }

}
