import { Injectable } from '@angular/core';
import { Skill, SkillCategory, SkillEntity, SkillOnly, SkillSubCategory, SkillSubCategoryOnly, SkillTypes, Skill_SkillSubCategory } from './skill.model';
import * as skillData from 'src/data/skill.json'
import { ApplicationService } from '../application/application.service';
import { LanguageService } from '../language/language.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { ActivityService } from '../activity/activity.service';
import { AbilityService } from '../ability/ability.service';
import { SkillCategoriesService } from './skill-categories.service';
import { FiltersEntity } from 'src/app/store/filter/filter.model';
var _ = require('underscore');

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  onlySkills:SkillOnly[] = (skillData as any).default;
  skills:SkillEntity[];

  constructor(skillCategoriesService:SkillCategoriesService, applicationService:ApplicationService, languageService:LanguageService, knowledgeService:KnowledgeService, activityService:ActivityService, abilityService:AbilityService) { 
    this.getFilters();
    //this.skills = this.onlySkills.map(skill =>this.fillSkillProps(skill, skillCategoriesService, applicationService, languageService, knowledgeService, activityService, abilityService));
    this.skills = this.onlySkills.map(skill =>this.fillSkillProps(skill, skillCategoriesService, applicationService, languageService, knowledgeService, activityService, abilityService));
  }

  getFilters():FiltersEntity{
    let x = _.uniq(_.map(this.skills, 'name'));
    return{
      id: 'skills',
      name: 'skillsFilters',
      categories: [
        {
          id: 'asdf',
          name: 'apps',
          tags:[
            {
              id: 'asdf',
              name: 'react',
              selected: true
            }
          ]
        },
      ],
    };
  }

  /*getSkillUrl(skill:Skill):string {
    let str = skill.type === SkillTypes.app ? skill.application?.url :
    skill.type === SkillTypes.sprache ? skill.language?.url :
    skill.type === SkillTypes.wissen ? skill.knowledge?.url :
    skill.type === SkillTypes.aktivität ? skill.activity?.url :
    skill.type === SkillTypes.skill ? skill.ability?.url : "";
    return str === undefined ? "" : str;
  }*/
  
  getSkills():SkillEntity[] {
    return this.skills;
  }
  
  getSkillTypes():{[key:string]:string} {
    return SkillTypes;
    //return _.keys(_.countBy(this.onlySkills, function(skill:Skill) { return skill.type; }));
  }
  
  getSkillsByType(type:string):SkillEntity[] {
    return Object.values(this.skills).filter(skill => skill.type === type);
  }
  
  fillSkillProps(skill:SkillOnly, skillCategoriesService:SkillCategoriesService, applicationService:ApplicationService, languageService:LanguageService, knowledgeService:KnowledgeService, activityService:ActivityService, abilityService:AbilityService):SkillEntity {
    if(skill.application_id !== ""){ 
      return {...skill, skillsubcategories: skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...applicationService.getApplicationById(skill.application_id), id: "skill_"+skill.skill_id, type:SkillTypes.application}; 
    }
    if(skill.language_id !== ""){
      return {...skill, skillsubcategories: skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...languageService.getLanguageById(skill.language_id), id: "skill_"+skill.skill_id, type:SkillTypes.language}; 
    }
    if(skill.knowledge_id !== ""){  
      return {...skill, skillsubcategories: skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...knowledgeService.getKnowledgeById(skill.knowledge_id), id: "skill_"+skill.skill_id, type:SkillTypes.knowledge};
    }
    if(skill.activity_id !== ""){ 
      return {...skill, skillsubcategories: skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...activityService.getActivityById(skill.activity_id), id: "skill_"+skill.skill_id, type:SkillTypes.activity};
    }
    if(skill.ability_id !== ""){  
      console.log(skill);
      return {...skill, skillsubcategories: skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...abilityService.getAbilityById(skill.ability_id), id: "skill_"+skill.skill_id, type:SkillTypes.ability};
    }
    return {...skill, id: "skill_"+skill.skill_id, skillsubcategories: skillCategoriesService.getSkillSubCategoriesOfSkill(skill), type:"", name:"", name_e:"", name_r:"", description:"", description_e:"", description_r:"", thumbnail:"", image:"", url:""};
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
}
