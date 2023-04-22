import { ApplicationTypeEntity } from "../application/application.model";
import { ContentEntity } from "src/app/services/entities.model";
import { SkillSubCategoryEntity } from "../skill-categories/skill-categories.model";


export interface SkillEntity extends ContentEntity {
  skill_id: string;
  identifier: string;
  hobby: boolean;
  knowledgepercent: number;
  proficiencylevel: string;
  proficiencylevel_e: string;
  proficiencylevel_r: string;
  yearsofexperience: number;
  type:string;
  skillsubcategories: SkillSubCategoryEntity[];
  shortname?: string;
  alternatename?: string;
  alternatename_e?: string;
  alternatename_r?: string;
  keywords?: string;
  keywords_e?: string;
  keywords_r?: string;
  version?: string;
  applicationtype?: ApplicationTypeEntity;
}

export interface SkillOnly {
  skill_id: string;
  identifier: string;
  hobby: boolean;
  knowledgepercent: number;
  proficiencylevel: string;
  proficiencylevel_e: string;
  proficiencylevel_r: string;
  yearsofexperience: number;
  application_id: string;
  language_id: string;
  knowledge_id: string;
  activity_id: string;
  ability_id: string;
}

export const SkillTypes = {
  application: "Applikation", 
  ability: "Skill", 
  activity: "Aktivität", 
  language: "Sprache",
  knowledge: "Wissen"
} as const;

export interface SkillFilter {
  category: string[],
  subcategory: string[],
  type: string[],
  hobby: boolean,
  applicationtype?: string[]
}

export interface SkillFilter2 {
  category: {[key:string]:string},
  subcategory: {[key:string]:string},
  type: {[key:string]:string},
  hobby: boolean,
  applicationtype?: {[key:string]:string}
}