import { Injectable } from '@angular/core';
import { SkillService } from '../../skills/skill/skill.service';
import { SkillCategoryEntity, SkillSubCategoryEntity } from '../../skills/skill-category/skill-category.model';
import { FilterCategoryEntity } from '../filter.model';
import { SkillEntity, SkillTypes } from '../../skills/skill/skill.model';
import { SkillCategoriesService } from '../../skills/skill-category/skill-category.service';
import { ApplicationService } from '../../skills/application/application.service';
import { SkillFiltersEntity } from './skills-filter.model';
import { ApplicationTypeEntity } from '../../skills/application/application.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsFilterService {
  categoryFilters: FilterCategoryEntity;
  subcategoryFilters: FilterCategoryEntity;
  typeFilters: FilterCategoryEntity;
  hobbyFilters: FilterCategoryEntity;
  applicationtypeFilters: FilterCategoryEntity;
  skillFilters: SkillFiltersEntity;

  constructor(private skillService:SkillService, private skillCategoriesService:SkillCategoriesService, private applicationService:ApplicationService) { 
    this.categoryFilters = this.getCategoryFilters(this.skillCategoriesService.getSkillCategories());
    this.subcategoryFilters = this.getSubCategoryFilters(this.skillCategoriesService.getSkillSubCategories());
    this.applicationtypeFilters = this.getApplicationTypeFilters(this.applicationService.getApplicationTypes());
    this.typeFilters = this.getTypeFilters(Object.entries(this.skillService.getSkillTypes()).map(([key, value]) => value));
    this.hobbyFilters = this.getHobbyFilters();
    this.skillFilters = {
      id:"filter_skill", 
      name:"Skills", 
      categories:[this.categoryFilters, this.subcategoryFilters, this.typeFilters, this.hobbyFilters, this.applicationtypeFilters]
    }
  }

  getSkillFiltersOfSkills(skills:SkillEntity[]):any {
    let subCategories:SkillSubCategoryEntity[]=[];
    let categories:SkillCategoryEntity[]=[];
    let appTypes:ApplicationTypeEntity[]=[];
    let types:string[]=[];
    let hobbies:boolean[]=[];
    let filters:FilterCategoryEntity[] = [];

    skills.forEach(skill => {
      skill.skillsubcategories.forEach(subCat => {
        if(!subCategories.some(elem => elem.skillsubcategory_id == subCat.skillsubcategory_id)){
          subCategories.push(subCat);
        }
      })
      skill.skillcategories.forEach(cat => {
        if(!categories.some(elem => elem.skillcategory_id == cat.skillcategory_id)){
          categories.push(cat);
        }
      })
      if(skill.applicationtype !== undefined && !appTypes.some(elem => elem.applicationtype_id == skill.applicationtype?.applicationtype_id)){
        appTypes.push(skill.applicationtype);
      }
      if(!types.includes(skill.type)){
        types.push(skill.type);
      }
      if(!hobbies.includes(skill.hobby)){
        hobbies.push(skill.hobby);
      }
    })

    if(categories.length > 1){ filters.push(this.getCategoryFilters(categories)) }
    if(subCategories.length > 1){ filters.push(this.getSubCategoryFilters(subCategories)) }
    if(types.length > 1){ filters.push(this.getTypeFilters(types)) }
    if(appTypes.length > 1){ filters.push(this.getApplicationTypeFilters(appTypes)) }
    if(hobbies.includes(false) && hobbies.includes(true)){ filters.push(this.getHobbyFilters()) }

    return {
      id:"filter_skill", 
      name:"Skills", 
      categories:filters
    }
  }

  getSkillFilters():SkillFiltersEntity {
    return this.skillFilters;
  }

  getCategoryFilters(categories:SkillCategoryEntity[]):FilterCategoryEntity {
    return {
      id:"filter_skill_category",
      name:"Kategorie",
      selected:true,
      tags: categories.map(skillCat => {
        return { id:"filter_skill_category_"+skillCat.skillcategory_id, name:skillCat.name, selected: false, value: skillCat.skillcategory_id}
      })
    };
  }

  getSubCategoryFilters(subCategories:SkillSubCategoryEntity[]):FilterCategoryEntity {
    return {
      id:"filter_skill_subcategory",
      name:"Unterkategorie",
      selected:true,
      tags: subCategories.map(skillSubCat => {
        return { id:"filter_skill_subcategory_"+skillSubCat.skillsubcategory_id, name:skillSubCat.name, selected: false, value: skillSubCat.skillsubcategory_id}
      })
    };
  }
  
  getApplicationTypeFilters(appTypes:ApplicationTypeEntity[]):FilterCategoryEntity {
    return {
      id:"filter_skill_applicationtype",
      name:"Applikationstyp",
      selected:true,
      tags: appTypes.map(appType => {
        return { id:"filter_skill_applicationtype_"+appType.applicationtype_id, name:appType.name, selected: false, value: appType.applicationtype_id}
      })
    };
  }

  getTypeFilters(types:string[]):FilterCategoryEntity{
    return {
      id:"filter_skill_type",
      name:"Typ",
      selected:true,
      tags: types.map(type => {
        return { id:"filter_skill_type_"+type, name:type, selected: false, value: type}
      })
    };
  }

  getHobbyFilters():FilterCategoryEntity{ 
    return {
      id:"filter_skill_hobby",
      name:"Hobby",
      selected:true,
      tags: [
        {
          id:"filter_skill_hobby_true",
          name:"Freizeitbeschäftigung",
          selected:false,
          value:true
        },
        {
          id:"filter_skill_hobby_false",
          name:"Keine Freizeitbeschäftigung",
          selected:false,
          value:false
        }
      ]
    }
  }

}
