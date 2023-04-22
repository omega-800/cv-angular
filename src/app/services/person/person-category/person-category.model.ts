import { NamedEntity } from "../../entities.model";

export interface PersonCategoryEntity extends NamedEntity {
    personcategory_id: string;
}

export interface PersonCategoryOnly {
  personcategory_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
}