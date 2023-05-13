import { Component } from '@angular/core';
import { SkillService } from 'src/app/services/skills/skill/skill.service';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SkillCategoriesService } from 'src/app/services/skills/skill-category/skill-category.service';
import { SkillSubCategoryEntity } from 'src/app/services/skills/skill-category/skill-category.model';
import { SkillFiltersEntity } from 'src/app/services/filter/skills-filter/skills-filter.model';
import { SkillsFilterService } from 'src/app/services/filter/skills-filter/skills-filter.service';

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
  filter:SkillFiltersEntity;

  constructor(private skillService:SkillService, private skillCategoriesService:SkillCategoriesService, private skillsFilterService:SkillsFilterService,) { 
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
    this.filter = this.skillsFilterService.getSkillFilters();
  }

}
