import { Application, ApplicationType } from "../application/application.model";
import { Language } from "../language/language.model";
import { Knowledge } from "../knowledge/knowledge.model";
import { Activity } from "../activity/activity.model";
import { Ability } from "../ability/ability.model";

export interface SkillCategory {
  skillcategory_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  percent: number;
}

export interface SkillSubCategory {
  skillsubcategory_id: string;
  skillcategory: SkillCategory;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
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

export interface Skill {
  skill_id: string;
  identifier: string;
  hobby: boolean;
  knowledgepercent: number;
  proficiencylevel: string;
  proficiencylevel_e: string;
  proficiencylevel_r: string;
  yearsofexperience: number;
  type:string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  thumbnail: string;
  image: string;
  url: string;
  skillsubcategories: SkillSubCategory[];
  shortname?: string;
  alternatename?: string;
  alternatename_e?: string;
  alternatename_r?: string;
  keywords?: string;
  keywords_e?: string;
  keywords_r?: string;
  version?: string;
  applicationtype?: ApplicationType;
}

export interface SkillOld {
  skill_id: string;
  identifier: string;
  hobby: boolean;
  knowledgepercent: number;
  proficiencylevel: string;
  proficiencylevel_e: string;
  proficiencylevel_r: string;
  yearsofexperience: number;
  type:string;
  application?: Application;
  language?: Language;
  knowledge?: Knowledge;
  activity?: Activity;
  ability?: Ability;
  skillsubcategories: SkillSubCategory[];
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

export interface Skill_SkillSubCategory {
  skill_skillsubcategory_id: string;
  skillsubcategory_id: string;
  skill_id: string;
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