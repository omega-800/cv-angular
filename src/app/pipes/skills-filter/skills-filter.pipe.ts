import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from 'src/app/services/skill/skill.model';

@Pipe({
  name: 'skillsFilter'
})
export class SkillsFilterPipe implements PipeTransform {

  transform(skills:Skill[], types:string[], ...args:string[]): Skill[] {
    if(!skills){
      return skills;
    }
    if(types){
      //skills = skills.filter(skill => types.includes(skill.type));
    }

    return skills;
  }

}
