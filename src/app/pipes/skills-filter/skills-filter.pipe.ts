import { Pipe, PipeTransform } from '@angular/core';
import { SelectedFilterEntity } from 'src/app/services/filter/filter.model';
import { skillFilterProps } from 'src/app/services/filter/skills-filter/skills-filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Pipe({
  name: 'skillsFilter',
  pure: false,
  standalone: true
})
export class SkillsFilterPipe implements PipeTransform {

  transform(skills: SkillEntity[], filters: SelectedFilterEntity[], ...args: string[]): SkillEntity[] {
    if (skills && filters && filters.length > 0) {
      return skills.filter(skill => this.filtersApplyTo(skill, filters));
    }
    return skills;
  }

  filtersApplyTo(skill: SkillEntity, filters: SelectedFilterEntity[]): boolean {
    let appliesRange: boolean = false;
    if (filters.some(filter => filter.range)) {
      filters.forEach(filter => {
        if (filter.range && filter.category === skillFilterProps.knowledge) {
          let min: number = Number(filter.value[0]);
          let max: number = Number(filter.value[1]);
          if (min > max) {
            [min, max] = [max, min];
          }
          appliesRange = skill.knowledgepercent >= min && skill.knowledgepercent <= max;
        }
      });
    } else {
      appliesRange = true;
    }

    let appliesSkills: boolean = true;
    filters.forEach(filter => {
      if (appliesSkills && !filter.range) {
        appliesSkills = filter.category === skillFilterProps.category ? skill.skillcategories.some(cat => filter.value.includes(cat.skillcategory_id)) :
          filter.category === skillFilterProps.subcategory ? skill.skillsubcategories.some(subCat => filter.value.includes(subCat.skillsubcategory_id)) :
            filter.category === skillFilterProps.type ? filter.value.includes(skill.type) :
              filter.category === skillFilterProps.hobby ? filter.value.includes(skill.hobby) :
                filter.category === skillFilterProps.apptype ? filter.value.includes(skill.applicationtype?.applicationtype_id!) :
                  false;
      }
    })

    return appliesRange && appliesSkills;
  }

}
