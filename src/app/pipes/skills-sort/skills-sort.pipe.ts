import { Pipe, PipeTransform } from '@angular/core';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SortEntity } from 'src/app/services/filter/filter.model';
import { skillSortValues } from './skills-sort.model';
import { Interest } from 'src/app/store/app/app.model';

@Pipe({
  name: 'skillsSort',
  standalone: true
})
export class SkillsSortPipe implements PipeTransform {

  transform(skills: SkillEntity[], sortBy: SortEntity, ascending: boolean): SkillEntity[] {
    if (!skills) {
      return skills;
    }
    if (sortBy) {
      if (Object.values(Interest).includes(sortBy.value as Interest)) {
        skills = skills.sort((a, b) => a[`relevance_${sortBy.value}` as keyof typeof a] == undefined ? 1 : b[`relevance_${sortBy.value}` as keyof typeof a] == undefined ? -1 :
          a[`relevance_${sortBy.value}` as keyof typeof a]! > b[`relevance_${sortBy.value}` as keyof typeof a]! ?
            (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === skillSortValues.knowledge) {
        skills = skills.sort((a, b) => ascending ? a.knowledgepercent - b.knowledgepercent : b.knowledgepercent - a.knowledgepercent);
      } else if (sortBy.value === skillSortValues.type) {
        skills = skills.sort((a, b) => a.type.toLowerCase() > b.type.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === skillSortValues.name) {
        skills = skills.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === skillSortValues.category) {
        skills = skills.sort((a, b) => a.skillcategories[0].name.toLowerCase() > b.skillcategories[0].name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === skillSortValues.subcategory) {
        skills = skills.sort((a, b) => a.skillsubcategories[0].name.toLowerCase() > b.skillsubcategories[0].name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));;
      }
    }
    return skills;
  }

}
