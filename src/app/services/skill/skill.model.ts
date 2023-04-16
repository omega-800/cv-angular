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
  hobby: boolean;
  knowledgepercent: number;
  proficiencylevel: string;
  proficiencylevel_e: string;
  proficiencylevel_r: string;
  yearsofexperience: number;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  thumbnail: string;
  image: string;
  url: string;
  type: string;
  alternatename: string;
  alternatename_e: string;
  alternatename_r: string;
  keywords: string;
  keywords_e: string;
  keywords_r: string;
  version: string;
  shortname: string;
  applicationtype_id: string;
}

export interface Skill_SkillSubCategory {
  skill_skillsubcategory_id: string;
  skillsubcategory_id: string;
  skill_id: string;
}

export const SkillTypes = {
  app: "Applikation", 
  skill: "Skill", 
  aktivität: "Aktivität", 
  sprache: "Sprache",
  wissen: "Wissen"
} as const;

