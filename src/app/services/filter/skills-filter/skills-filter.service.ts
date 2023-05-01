import { Injectable } from '@angular/core';
import { SkillService } from '../../skills/skill/skill.service';
import { SkillCategoryEntity } from '../../skills/skill-category/skill-category.model';
import { FilterCategoryEntity } from '../filter.model';
import { SkillTypes } from '../../skills/skill/skill.model';
import { SkillCategoriesService } from '../../skills/skill-category/skill-category.service';
import { ApplicationService } from '../../skills/application/application.service';
import { SkillFiltersEntity } from './skills-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsFilterService {
  category: FilterCategoryEntity;
  subcategory: FilterCategoryEntity;
  type: FilterCategoryEntity = {
    id:"filter_skill_type",
    name:"Type",
    selected:true,
    tags: [
      {
        id:"",
        name:"",
        selected:true,
        value:""
      }
    ]
  }
  hobby: FilterCategoryEntity = {
    id:"filter_skill_hobby",
    name:"Hobby",
    selected:true,
    tags: [
      {
        id:"filter_skill_hobby_true",
        name:"Is a hobby",
        selected:false,
        value:true
      },
      {
        id:"filter_skill_hobby_false",
        name:"Is not a hobby",
        selected:false,
        value:false
      }
    ]
  };
  applicationtype: FilterCategoryEntity;
  skillFilters: SkillFiltersEntity;

  constructor(private skillService:SkillService, private skillCategoriesService:SkillCategoriesService, private applicationService:ApplicationService) { 
    this.category = this.getCategoryFilters();
    this.subcategory = this.getSubCategoryFilters();
    this.applicationtype = this.getApplicationTypeFilters();
    this.skillFilters = {
      id:"filter_skill", 
      name:"Skills", 
      category:this.category, 
      subcategory:this.subcategory, 
      type:this.type, 
      hobby:this.hobby, 
      applicationtype: this.applicationtype
    }
  }

  getSkillFilters():SkillFiltersEntity {
    return this.skillFilters;
  }

  getCategoryFilters():FilterCategoryEntity {
    return {
      id:"filter_skill_category",
      name:"Category",
      selected:true,
      tags: this.skillCategoriesService.getSkillCategories().map(skillCat => {
        return { id:"filter_skill_category_"+skillCat.id, name:skillCat.name, selected: false, value: skillCat.skillcategory_id}
      })
    };
  }

  getSubCategoryFilters():FilterCategoryEntity {
    return {
      id:"filter_skill_subcategory",
      name:"Subcategory",
      selected:true,
      tags: this.skillCategoriesService.getSkillSubCategories().map(skillSubCat => {
        return { id:"filter_skill_subcategory_"+skillSubCat.id, name:skillSubCat.name, selected: false, value: skillSubCat.skillsubcategory_id}
      })
    };
  }
  
  getApplicationTypeFilters():FilterCategoryEntity {
    return {
      id:"filter_skill_applicationtype",
      name:"Application type",
      selected:true,
      tags: this.applicationService.getApplicationTypes().map(appType => {
        return { id:"filter_skill_applicationtype_"+appType.id, name:appType.name, selected: false, value: appType.applicationtype_id}
      })
    };
  }

}
