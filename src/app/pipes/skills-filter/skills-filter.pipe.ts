import { Pipe, PipeTransform } from '@angular/core';
import { SelectedFilterEntity } from 'src/app/services/filter/filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { forEach } from 'underscore';

@Pipe({
  name: 'skillsFilter',
  pure: false
})
export class SkillsFilterPipe implements PipeTransform {

  transform(skills:SkillEntity[], filters:SelectedFilterEntity[], ...args:string[]): SkillEntity[] {
    if(skills && filters && filters.length > 0) {
      return skills.filter(skill => this.filtersApplyTo(skill, filters));
    }
    return skills;
  }

  filtersApplyTo(skill:SkillEntity, filters:SelectedFilterEntity[]):boolean {
    let applies:boolean = false;

    filters.forEach(filter => {
      if(!applies) {
        applies = filter.category === "knowledgepercent" ? skill.knowledgepercent == filter.value : 
          filter.category === "filter_skill_category" ? skill.skillcategories.some(cat => cat.skillcategory_id == filter.value) :
          filter.category === "filter_skill_subcategory" ? skill.skillsubcategories.some(subCat => subCat.skillsubcategory_id == filter.value) :
          filter.category === "filter_skill_type" ? skill.type == filter.value :
          filter.category === "filter_skill_hobby" ? skill.hobby == filter.value :
          filter.category === "filter_skill_applicationtype" ? skill.applicationtype?.applicationtype_id == filter.value : 
          false;
      }
    })

    return applies;
  }

}
