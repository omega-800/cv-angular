import { Component, Input } from '@angular/core';
import { SkillSortEntity, skillProps, SkillProp, isOfTypeSkillProp } from 'src/app/pipes/skills-sort/skills-sort.model';
import { SortEntity } from 'src/app/services/filter/filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';

@Component({
  selector: 'app-skills-percent',
  templateUrl: './skills-percent.component.html',
  styleUrls: ['./skills-percent.component.scss']
})
export class SkillsPercentComponent {
  @Input() skills!: SkillEntity[];
  @Input() name!: string;
  sortFields:SkillSortEntity[] = skillProps;
  sortValue: SkillSortEntity = {id:"knowledgepercent",value:"knowledgepercent",name:'knowledgepercent'};
  sortAsc:boolean=true;

  sortSkillsBy(selected:{value:SortEntity,ascending:boolean}){
    this.sortValue = {...selected.value, value:this.valueToSkillProp(selected.value.value)};
    this.sortAsc = selected.ascending; 
  }

  valueToSkillProp(value:string):SkillProp{
    if(isOfTypeSkillProp(value)){
      return <SkillProp>value;
    } else {
      return "knowledgepercent";
    }
  }
}
