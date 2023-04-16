import { Injectable } from '@angular/core';
import { Skill, SkillCategory, SkillSubCategory, Skill_SkillSubCategory } from './skill.model';
import * as skillData from 'src/data/skill.json'
import * as skillCategoryData from 'src/data/skillcategory.json'
import * as skillSubCategoryData from 'src/data/skillsubcategory.json'
import * as skill_skillSubCategoryData from 'src/data/skill_skillsubcategory.json'
var _ = require('underscore');

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skills:Skill[] = (skillData as any).default;
  skillCategories:SkillCategory[] = (skillCategoryData as any).default;
  skillSubCategories:SkillSubCategory[] = (skillSubCategoryData as any).default;
  skillSubCategoryLinks:Skill_SkillSubCategory[] = (skill_skillSubCategoryData as any).default;

  constructor() { }
  
  getSkillCategories():SkillCategory[] {
    return this.skillCategories;
  }
  
  getSkillSubCategories():SkillSubCategory[] {
    return this.skillSubCategories;
  }
  
  getSkillTypes():string[] {
    return _.keys(_.countBy(this.skills, function(skill:Skill) { return skill.type; }));
  }

  getSkills():Skill[] {
    return this.skills;
  }

  getSkillById(id:string):Skill {
    return Object.values(this.skills).filter(skill => skill.skill_id === id)[0];
  }

  getHobbies():Skill[] {
    return Object.values(this.skills).filter(skill => skill.hobby);
  }
  
  getSkillsByType(type:string):Skill[] {
    return Object.values(this.skills).filter(skill => skill.type === type);
  }
}
