import { Component } from '@angular/core';
import { SkillService } from 'src/app/services/skills/skill/skill.service';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SkillCategoriesService } from 'src/app/services/skills/skill-categories/skill-categories.service';
import { SkillSubCategoryEntity } from 'src/app/services/skills/skill-categories/skill-categories.model';

@Component({
  selector: 'app-skills-percent-list',
  templateUrl: './skills-percent-list.component.html',
  styleUrls: ['./skills-percent-list.component.scss']
})
export class SkillsPercentListComponent {
  types:{[key:string]:string};
  allSkillSubCategories:SkillSubCategoryEntity[];
  allSkills:SkillEntity[];
  allSkillsByType:{[key:string]:SkillEntity[]} = {};

  constructor(private skillService:SkillService, private skillCategoriesService:SkillCategoriesService) { 
    /*this.skillService.getSkillTypes().forEach(type => {
      this.allSkills[type] = this.skillService.getSkillsByType(type);
    });
    this.types = this.skillService.getSkillTypes();*/
    this.types = this.skillService.getSkillTypes();
    this.allSkillSubCategories = this.skillCategoriesService.getSkillSubCategories();
    this.allSkills = this.skillService.getSkills();
    for (const [key, value] of Object.entries(this.types)) {
      this.allSkillsByType[value] = this.skillService.getSkillsByType(value);
    }
  }

}
