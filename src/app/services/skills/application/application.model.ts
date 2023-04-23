import { ContentEntity, NamedEntity } from "src/app/services/entities.model";

export interface ApplicationEntity extends ContentEntity {
  application_id: string;
  alternatename: string;
  alternatename_e: string;
  alternatename_r: string;
  keywords: string;
  keywords_e: string;
  keywords_r: string;
  version: string;
  applicationtype: ApplicationTypeEntity;
}

export interface ApplicationOnly {
  application_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  thumbnail: string;
  image: string;
  url: string;
  alternatename: string;
  alternatename_e: string;
  alternatename_r: string;
  keywords: string;
  keywords_e: string;
  keywords_r: string;
  version: string;
  applicationtype_id: string;
}

export interface ApplicationTypeEntity extends NamedEntity {
  applicationtype_id: string;
}

export interface ApplicationTypeOnly {
  applicationtype_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
}