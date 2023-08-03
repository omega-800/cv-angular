import { Pipe, PipeTransform } from '@angular/core';
import { FilterCategoryEntity, FilterTypes, FiltersEntity } from 'src/app/services/filter/filter.model';
import { skillFilterProps } from 'src/app/services/filter/skills-filter/skills-filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Pipe({
  name: 'skillsFilter',
  pure: false,
  standalone: true
})
export class SkillsFilterPipe implements PipeTransform {

  transform(skills: SkillEntity[], filters: FiltersEntity[], ...args: string[]): SkillEntity[] {
    let skillFilters = filters.find(elem => elem.type == FilterTypes.SKILL)?.categories;
    if (skillFilters != undefined && skills && skillFilters.length > 0) {
      return skills.filter(skill => this.filtersApplyTo(skill, skillFilters!));
    }
    return skills;
  }

  filtersApplyTo(skill: SkillEntity, filters: FilterCategoryEntity[]): boolean {
    let appliesRange: boolean = false;
    if (filters.some(filter => filter.isRange)) {
      filters.forEach(filter => {
        if (filter.isRange && filter.id === skillFilterProps.knowledge) {
          let min: number = Number(filter.tags[0].value);
          let max: number = Number(filter.tags[1].value);
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
      if (appliesSkills && !filter.isRange) {
        appliesSkills = filter.id === skillFilterProps.category ? skill.skillcategories.some(cat => filter.tags.some(elem => elem.value == cat.skillcategory_id)) :
          filter.id === skillFilterProps.subcategory ? skill.skillsubcategories.some(subCat => filter.tags.some(elem => elem.value == subCat.skillsubcategory_id)) :
            filter.id === skillFilterProps.type ? filter.tags.some(elem => elem.value == skill.type) :
              filter.id === skillFilterProps.hobby ? filter.tags.some(elem => elem.value == skill.hobby) :
                filter.id === skillFilterProps.apptype ? filter.tags.some(elem => elem.value == skill.applicationtype?.applicationtype_id!) :
                  false;
      }
    })

    return appliesRange && appliesSkills;
  }

}
