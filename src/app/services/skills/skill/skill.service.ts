import { Injectable } from '@angular/core';
import { SkillEntity, SkillOnly, SkillTypes} from './skill.model';
import * as skillData from 'src/data/skill.json'
import { AbilityService } from '../ability/ability.service';
import { ActivityService } from '../activity/activity.service';
import { ApplicationService } from '../application/application.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { LanguageService } from '../language/language.service';
import { SkillCategoriesService } from '../skill-category/skill-category.service';
var _ = require('underscore');

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private onlySkills:SkillOnly[] = (skillData as any).default;
  private skills:SkillEntity[];

  constructor(private skillCategoriesService:SkillCategoriesService, private applicationService:ApplicationService, private languageService:LanguageService, private knowledgeService:KnowledgeService, private activityService:ActivityService, private abilityService:AbilityService) { 
    //this.getFilters();
    //this.skills = this.onlySkills.map(skill =>this.fillSkillProps(skill, skillCategoriesService, applicationService, languageService, knowledgeService, activityService, abilityService));
    this.skills = this.onlySkills.map(skill =>this.fillSkillProps(skill));
  }
/*
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
  */
 
  getSkillById(id:string):SkillEntity {
    return Object.values(this.skills).filter(skill => skill.skill_id === id)[0];
  }

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
  
  fillSkillProps(skill:SkillOnly):SkillEntity {
    if(skill.application_id !== ""){ 
      return {...skill, skillcategories: this.skillCategoriesService.getSkillCategoriesOfSkill(skill), skillsubcategories: this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...this.applicationService.getApplicationById(skill.application_id), id: "skill_"+skill.skill_id, type:SkillTypes.application}; 
    }
    if(skill.language_id !== ""){
      return {...skill, skillcategories: this.skillCategoriesService.getSkillCategoriesOfSkill(skill), skillsubcategories: this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...this.languageService.getLanguageById(skill.language_id), id: "skill_"+skill.skill_id, type:SkillTypes.language}; 
    }
    if(skill.knowledge_id !== ""){  
      return {...skill, skillcategories: this.skillCategoriesService.getSkillCategoriesOfSkill(skill), skillsubcategories: this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...this.knowledgeService.getKnowledgeById(skill.knowledge_id), id: "skill_"+skill.skill_id, type:SkillTypes.knowledge};
    }
    if(skill.activity_id !== ""){ 
      return {...skill, skillcategories: this.skillCategoriesService.getSkillCategoriesOfSkill(skill), skillsubcategories: this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...this.activityService.getActivityById(skill.activity_id), id: "skill_"+skill.skill_id, type:SkillTypes.activity};
    }
    if(skill.ability_id !== ""){  
      return {...skill, skillcategories: this.skillCategoriesService.getSkillCategoriesOfSkill(skill), skillsubcategories: this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill), ...this.abilityService.getAbilityById(skill.ability_id), id: "skill_"+skill.skill_id, type:SkillTypes.ability};
    }
    return {...skill, id: "skill_"+skill.skill_id, skillcategories: this.skillCategoriesService.getSkillCategoriesOfSkill(skill), skillsubcategories: this.skillCategoriesService.getSkillSubCategoriesOfSkill(skill), type:"", name:"", name_e:"", name_r:"", description:"", description_e:"", description_r:"", thumbnail:"", image:"", url:""};
  }

}
