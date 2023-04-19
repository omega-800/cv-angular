import { Injectable } from '@angular/core';
import * as skillCategoryData from 'src/data/skillcategory.json'
import * as skillSubCategoryData from 'src/data/skillsubcategory.json'
import * as skill_skillSubCategoryData from 'src/data/skill_skillsubcategory.json'
import { SkillCategory, SkillSubCategory, Skill_SkillSubCategory, SkillSubCategoryOnly, SkillOnly } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillCategoriesService {
  skillCategories:SkillCategory[];
  skillSubCategories:SkillSubCategory[];
  skillSubCategoryLinks:Skill_SkillSubCategory[];
  onlySkillSubCategories:SkillSubCategoryOnly[];

  constructor() { 
    this.onlySkillSubCategories = (skillSubCategoryData as any).default;

    this.skillCategories = (skillCategoryData as any).default;
    this.skillSubCategoryLinks = (skill_skillSubCategoryData as any).default;
    this.skillSubCategories = this.onlySkillSubCategories.map(subCat => this.fillSubCategory(subCat));
  }
  
  getSkillCategories():SkillCategory[] {
    return this.skillCategories;
  }

  getSkillCategoryById(id:string):SkillCategory {
    return Object.values(this.skillCategories).filter(skillCat => skillCat.skillcategory_id === id)[0];
  }

  getSkillSubCategories():SkillSubCategory[] {
    return this.skillSubCategories;
  }

  getSkillSubCategoryById(id:string):SkillSubCategory {
    return Object.values(this.skillSubCategories).filter(skillSubCat => skillSubCat.skillsubcategory_id === id)[0];
  }
  
  getSkillSubCategoriesOfSkill(skill:SkillOnly):SkillSubCategory[] {
    let subCategoriesOfSkill:string[] = Object.values(this.skillSubCategoryLinks).filter(link => link.skill_id === skill.skill_id).map(filteredLink => filteredLink.skillsubcategory_id);
    return Object.values(this.skillSubCategories).filter(subCategory => subCategoriesOfSkill.includes(subCategory.skillsubcategory_id));
  }

  fillSubCategory(subCat:SkillSubCategoryOnly):SkillSubCategory {
    return {...subCat, skillcategory: this.getSkillCategoryById(subCat.skillcategory_id)};
  }

  getOnlySkillSubCategories():SkillSubCategoryOnly[] {
    return this.onlySkillSubCategories;
  }

}
