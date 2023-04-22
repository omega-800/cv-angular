import { Injectable } from '@angular/core';
import * as skillCategoryData from 'src/data/skillcategory.json'
import * as skillSubCategoryData from 'src/data/skillsubcategory.json'
import * as skill_skillSubCategoryData from 'src/data/skill_skillsubcategory.json'
import { SkillCategory, SkillSubCategory, Skill_SkillSubCategory, SkillSubCategoryOnly, SkillOnly, SkillCategoryEntity, SkillSubCategoryEntity } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillCategoriesService {
  onlySkillSubCategories:SkillSubCategoryOnly[] = (skillSubCategoryData as any).default;
  skillCategoriesData:SkillCategory[] = (skillCategoryData as any).default;
  skillSubCategoryLinks:Skill_SkillSubCategory[] = (skill_skillSubCategoryData as any).default;

  skillCategories:SkillCategoryEntity[];
  skillSubCategories:SkillSubCategoryEntity[];

  constructor() { 
    this.skillCategories = this.skillCategoriesData.map(cat => {return { ...cat, id: cat.skillcategory_id}})
    this.skillSubCategories = this.onlySkillSubCategories.map(subCat => this.fillSubCategory(subCat));
  }
  
  getSkillCategories():SkillCategoryEntity[] {
    return this.skillCategories;
  }

  getSkillCategoryById(id:string):SkillCategoryEntity {
    return Object.values(this.skillCategories).filter(skillCat => skillCat.id === id)[0];
  }

  getSkillSubCategories():SkillSubCategoryEntity[] {
    return this.skillSubCategories;
  }

  getSkillSubCategoryById(id:string):SkillSubCategoryEntity {
    return Object.values(this.skillSubCategories).filter(skillSubCat => skillSubCat.id === id)[0];
  }
  
  getSkillSubCategoriesOfSkill(skill:SkillOnly):SkillSubCategoryEntity[] {
    let subCategoriesOfSkill:string[] = Object.values(this.skillSubCategoryLinks).filter(link => link.skill_id === skill.skill_id).map(filteredLink => filteredLink.skillsubcategory_id);
    return Object.values(this.skillSubCategories).filter(skillSubCat => subCategoriesOfSkill.includes(skillSubCat.id));
  }

  fillSubCategory(subCat:SkillSubCategoryOnly):SkillSubCategoryEntity {
    return {...subCat, skillcategory: this.getSkillCategoryById(subCat.skillcategory_id), id:subCat.skillsubcategory_id};
  }

  getOnlySkillSubCategories():SkillSubCategoryOnly[] {
    return this.onlySkillSubCategories;
  }

}
