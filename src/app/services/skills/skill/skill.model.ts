import { ApplicationTypeEntity } from '../application/application.model';
import { ContentEntity } from 'src/app/services/entities.model';
import {
  SkillCategoryEntity,
  SkillSubCategoryEntity,
} from '../skill-category/skill-category.model';
import { ImageComp } from 'src/app/components/components.model';

export interface SkillEntity extends ContentEntity {
  skill_id: string;
  identifier: string;
  hobby: boolean;
  knowledgepercent: number;
  proficiencylevel: string;
  proficiencylevel_e: string;
  proficiencylevel_r: string;
  yearsofexperience: number;
  type: string;
  skillcategories: SkillCategoryEntity[];
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
  icon: ImageComp;
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
  application: 'Applikation',
  ability: 'Skill',
  activity: 'Aktivität',
  language: 'Sprache',
  knowledge: 'Wissen',
} as const;
