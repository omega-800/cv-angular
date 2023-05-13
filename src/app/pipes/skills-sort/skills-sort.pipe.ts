import { Pipe, PipeTransform } from '@angular/core';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { SkillSortProp, SkillSortEntity } from './skills-sort.model';

@Pipe({
  name: 'skillsSort'
})
export class SkillsSortPipe implements PipeTransform {

  transform(skills:SkillEntity[], sortBy:SkillSortEntity, ascending:boolean): SkillEntity[] {
    if(!skills){
      return skills;
    }
    if(sortBy){
      if(sortBy.value ===  "knowledgepercent") {
          skills = skills.sort((a, b) => ascending ? a.knowledgepercent - b.knowledgepercent : b.knowledgepercent - a.knowledgepercent);
      } else if(sortBy.value === "type") {
          skills = skills.sort((a, b) => a.type.toLowerCase() > b.type.toLowerCase() ? 
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if(sortBy.value === "name") {
          skills = skills.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if(sortBy.value === "skillcategories") {
          skills = skills.sort((a, b) => a.skillcategories[0].name.toLowerCase() > b.skillcategories[0].name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if(sortBy.value === "skillsubcategories") {
          skills = skills.sort((a, b) => a.skillsubcategories[0].name.toLowerCase() > b.skillsubcategories[0].name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));;
      }
    }
    return skills;
  }

}
