export interface Application {
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
    applicationtype: ApplicationType;
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

export interface ApplicationType {
  applicationtype_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
}