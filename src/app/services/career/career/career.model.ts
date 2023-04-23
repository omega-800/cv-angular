import { ImageComponent } from "src/app/components/components.model";
import { Entity, NamedEntity } from "../../entities.model";
import { SchoolEntity } from "../school/school.model";
import { WorkplaceEntity } from "../workplace/workplace.model";
import { personIcon, schoolIcon, workIcon } from "src/app/components/components.constants";

export interface CareerEntity extends NamedEntity {
    career_id: string;
    yearfrom: number;
    yearto: number;
    type:CareerTypeEntity;
    document: string;
    workplace?: WorkplaceEntity;
    school?: SchoolEntity;
}

export interface CareerOnly {
  career_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  yearfrom: number;
  yearto: number;
  document: string;
  workplace_id: string;
  school_id: string;
}

export interface CareerTypeEntity extends Entity {
  name:string,
  logo:ImageComponent
}

export interface CareerTypes {
  SCHOOL:CareerTypeEntity,
  WORK:CareerTypeEntity,
  SOLO:CareerTypeEntity,
  OTHER:CareerTypeEntity
}

export const careerTypes:Readonly<CareerTypes> = {
  SCHOOL: {
    id:"careerType_school",
    name:"Schule", 
    logo:schoolIcon
  },
  WORK: {
    id:"careerType_work",
    name: "Arbeit", 
    logo:workIcon
  },
  SOLO: {
    id:"careerType_solo",
    name: "Selbstständig", 
    logo:personIcon
  }, 
  OTHER: {
    id:"careerType_other",
    name: "Andere", 
    logo:workIcon
  } 
} as const;

