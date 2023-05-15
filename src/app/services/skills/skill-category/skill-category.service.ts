import { Injectable } from '@angular/core';
import * as skillCategoryData from 'src/data/skillcategory.json'
import * as skillSubCategoryData from 'src/data/skillsubcategory.json'
import * as skill_skillSubCategoryData from 'src/data/skill_skillsubcategory.json'
import { SkillOnly } from '../skill/skill.model';
import { SkillSubCategoryOnly, SkillCategoryOnly, Skill_SkillSubCategory, SkillCategoryEntity, SkillSubCategoryEntity } from './skill-category.model';

@Injectable({
  providedIn: 'root'
})
export class SkillCategoriesService {
  private onlySkillSubCategories: SkillSubCategoryOnly[] = (skillSubCategoryData as any).default;
  private onlySkillCategories: SkillCategoryOnly[] = (skillCategoryData as any).default;
  private skillSubCategoryLinks: Skill_SkillSubCategory[] = (skill_skillSubCategoryData as any).default;

  private skillCategories: SkillCategoryEntity[];
  private skillSubCategories: SkillSubCategoryEntity[];

  constructor() {
    this.skillCategories = this.onlySkillCategories.map(cat => { return { ...cat, id: "skillCategory_" + cat.skillcategory_id } })
    this.skillSubCategories = this.onlySkillSubCategories.map(subCat => this.fillSubCategory(subCat));
  }

  getSkillCategories(): SkillCategoryEntity[] {
    return this.skillCategories;
  }

  getSkillCategoryById(id: string): SkillCategoryEntity {
    return Object.values(this.skillCategories).filter(skillCat => skillCat.skillcategory_id === id)[0];
  }

  getSkillSubCategories(): SkillSubCategoryEntity[] {
    return this.skillSubCategories;
  }

  getSkillSubCategoryById(id: string): SkillSubCategoryEntity {
    return Object.values(this.skillSubCategories).filter(skillSubCat => skillSubCat.skillsubcategory_id === id)[0];
  }

  getSkillSubCategoriesOfSkill(skill: SkillOnly): SkillSubCategoryEntity[] {
    let subCategoriesOfSkill: string[] = Object.values(this.skillSubCategoryLinks).filter(link => link.skill_id === skill.skill_id).map(filteredLink => filteredLink.skillsubcategory_id);
    return Object.values(this.skillSubCategories).filter(skillSubCat => subCategoriesOfSkill.includes(skillSubCat.skillsubcategory_id));
  }

  getSkillCategoriesOfSkill(skill: SkillOnly): SkillCategoryEntity[] {
    let subCategoriesOfSkill: SkillSubCategoryEntity[] = this.getSkillSubCategoriesOfSkill(skill);
    let categoriesOfSkill: SkillCategoryEntity[] = subCategoriesOfSkill.map(cat => cat.skillcategory);
    return categoriesOfSkill.filter((value, index, self) =>
      index === self.findIndex(t => (
        t.skillcategory_id === value.skillcategory_id
      ))
    )
  }

  fillSubCategory(subCat: SkillSubCategoryOnly): SkillSubCategoryEntity {
    return { ...subCat, skillcategory: this.getSkillCategoryById(subCat.skillcategory_id), id: "skillSubCategory_" + subCat.skillsubcategory_id };
  }

}
