import { NamedEntity } from "../../entities.model";
import { SchoolEntity } from "../school/school.model";
import { WorkplaceEntity } from "../workplace/workplace.model";

export interface CareerEntity extends NamedEntity {
    career_id: string;
    yearfrom: number;
    yearto: number;
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

