import { Entity } from "../../entities.model";

export interface CountryEntity extends Entity {
  country_id: string;
  name_e: string;
  name_r: string;
  shortname: string;
}

export interface CountryOnly {
  country_id: string;
  name: string;
  name_e: string;
  name_r: string;
  shortname: string;
}