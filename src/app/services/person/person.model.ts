import { ImageEntity, LinkEntity } from "src/app/services/entities.model";

export interface PersonEntity extends ImageEntity, LinkEntity {
  person_id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  birthplace: string;
  jobtitle: string;
  jobtitle_e: string;
  jobtitle_r: string;
  gender: string;
  relation: string;
  relation_e: string;
  relation_r: string;
  description: string;
  description_e: string;
  description_r: string;
  github: string;
  address_id: string;
  workplace_id: string;
  school_id: string;
  personcategory_id: string;
  contactpoint_id: string;
}

export interface PersonOnly {
  person_id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  birthplace: string;
  jobtitle: string;
  jobtitle_e: string;
  jobtitle_r: string;
  gender: string;
  image: string;
  thumbnail: string;
  relation: string;
  relation_e: string;
  relation_r: string;
  description: string;
  description_e: string;
  description_r: string;
  github: string;
  url: string;
  address_id: string;
  workplace_id: string;
  school_id: string;
  personcategory_id: string;
  contactpoint_id: string;
}