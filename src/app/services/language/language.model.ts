import { ContentEntity } from "src/app/services/entities.model";

export interface LanguageEntity extends ContentEntity {
  language_id: string;
  shortname: string;
}

export interface Language {
  language_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  thumbnail: string;
  image: string;
  url: string;
  shortname: string;
}