import { Pipe, PipeTransform } from '@angular/core';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Pipe({
  name: 'skillsFilter'
})
export class SkillsFilterPipe implements PipeTransform {

  transform(skills:SkillEntity[], types:string[], ...args:string[]): SkillEntity[] {
    if(!skills){
      return skills;
    }
    if(types){
      //skills = skills.filter(skill => types.includes(skill.type));
    }

    return skills;
  }

}
