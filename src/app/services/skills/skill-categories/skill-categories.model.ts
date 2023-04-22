import { NamedEntity } from "../../entities.model";

export interface SkillCategoryEntity extends NamedEntity {
    skillcategory_id: string;
    percent: number;
}
  
export interface SkillCategoryOnly {
    skillcategory_id: string;
    name: string;
    name_e: string;
    name_r: string;
    description: string;
    description_e: string;
    description_r: string;
    percent: number;
}
  
export interface SkillSubCategoryEntity extends NamedEntity {
    skillsubcategory_id: string;
    skillcategory: SkillCategoryEntity;
}
  
export interface SkillSubCategoryOnly {
    skillsubcategory_id: string;
    skillcategory_id: string;
    name: string;
    name_e: string;
    name_r: string;
    description: string;
    description_e: string;
    description_r: string;
}

export interface Skill_SkillSubCategory {
    skill_skillsubcategory_id: string;
    skillsubcategory_id: string;
    skill_id: string;
}