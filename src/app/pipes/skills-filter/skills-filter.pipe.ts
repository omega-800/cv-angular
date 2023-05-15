import { Pipe, PipeTransform } from '@angular/core';
import { SelectedFilterEntity } from 'src/app/services/filter/filter.model';
import { skillFilterProps } from 'src/app/services/filter/skills-filter/skills-filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { forEach } from 'underscore';

@Pipe({
  name: 'skillsFilter',
  pure: false
})
export class SkillsFilterPipe implements PipeTransform {

  transform(skills: SkillEntity[], filters: SelectedFilterEntity[], ...args: string[]): SkillEntity[] {
    if (skills && filters && filters.length > 0) {
      return skills.filter(skill => this.filtersApplyTo(skill, filters));
    }
    return skills;
  }

  filtersApplyTo(skill: SkillEntity, filters: SelectedFilterEntity[]): boolean {
    let applies: boolean = false;

    filters.forEach(filter => {
      if (!applies) {
        applies = filter.category === skillFilterProps.knowledge ? filter.value.includes(skill.knowledgepercent) :
          filter.category === skillFilterProps.category ? skill.skillcategories.some(cat => filter.value.includes(cat.skillcategory_id)) :
            filter.category === skillFilterProps.subcategory ? skill.skillsubcategories.some(subCat => filter.value.includes(subCat.skillsubcategory_id)) :
              filter.category === skillFilterProps.type ? filter.value.includes(skill.type) :
                filter.category === skillFilterProps.hobby ? filter.value.includes(skill.hobby) :
                  filter.category === skillFilterProps.apptype ? filter.value.includes(skill.applicationtype?.applicationtype_id!) :
                    false;
      }
    })

    return applies;
  }

}
