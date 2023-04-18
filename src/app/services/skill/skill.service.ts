import { Injectable } from '@angular/core';
import { Skill, SkillCategory, SkillOnly, SkillSubCategory, SkillSubCategoryOnly, SkillTypes, Skill_SkillSubCategory } from './skill.model';
import * as skillData from 'src/data/skill.json'
import * as skillCategoryData from 'src/data/skillcategory.json'
import * as skillSubCategoryData from 'src/data/skillsubcategory.json'
import * as skill_skillSubCategoryData from 'src/data/skill_skillsubcategory.json'
import { ApplicationService } from '../application/application.service';
import { LanguageService } from '../language/language.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { ActivityService } from '../activity/activity.service';
import { AbilityService } from '../ability/ability.service';
var _ = require('underscore');

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  onlySkills:SkillOnly[];
  //skills:Skill[];
  skillCategories:SkillCategory[];
  onlySkillSubCategories:SkillSubCategoryOnly[];
  skillSubCategories:SkillSubCategory[];
  skillSubCategoryLinks:Skill_SkillSubCategory[];

  constructor(applicationService:ApplicationService, languageService:LanguageService, knowledgeService:KnowledgeService, activityService:ActivityService, abilityService:AbilityService) { 
    this.onlySkills= (skillData as any).default;
    this.skillCategories = (skillCategoryData as any).default;
    this.onlySkillSubCategories = (skillSubCategoryData as any).default;
    this.skillSubCategoryLinks = (skill_skillSubCategoryData as any).default;
    this.skillSubCategories = this.onlySkillSubCategories.map(subCat => this.fillSubCategory(subCat));
    //this.skills = this.onlySkills.map(skill =>this.fillSkillProps(skill));
  }
  
  getSkillCategories():SkillCategory[] {
    return this.skillCategories;
  }

  getSkillCategoryById(id:string):SkillCategory {
    return Object.values(this.skillCategories).filter(skillCat => skillCat.skillcategory_id === id)[0];
  }

  getSkillSubCategoryById(id:string):SkillSubCategory {
    return Object.values(this.skillSubCategories).filter(skillSubCat => skillSubCat.skillsubcategory_id === id)[0];
  }
  getSkillSubCategories():SkillSubCategory[] {
    return this.skillSubCategories;
  }
  
  getOnlySkillSubCategories():SkillSubCategoryOnly[] {
    return this.onlySkillSubCategories;
  }
  
  getSkillTypes():{[key:string]:string} {
    return SkillTypes;
    //return _.keys(_.countBy(this.onlySkills, function(skill:Skill) { return skill.type; }));
  }

  getOnlySkills():SkillOnly[] {
    return this.onlySkills;
  }

  getOnlySkillById(id:string):SkillOnly {
    return Object.values(this.onlySkills).filter(skill => skill.skill_id === id)[0];
  }

  getOnlyHobbies():SkillOnly[] {
    return Object.values(this.onlySkills).filter(skill => skill.hobby);
  }
  
  /*fillSkillProps(skill:SkillOnly):Skill {

    return {...skill, skillSubCategory:""};
  }*/

  fillSubCategory(subCat:SkillSubCategoryOnly):SkillSubCategory {
    return {...subCat, skillcategory: this.getSkillCategoryById(subCat.skillcategory_id)};
  }
}
