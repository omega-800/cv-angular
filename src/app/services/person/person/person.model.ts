import { ImageEntity, LinkEntity, NamedEntity } from "src/app/services/entities.model";
import { ContactEntity } from "../../contact/contact.model";
import { SchoolEntity } from "../../career/school/school.model";
import { WorkplaceEntity } from "../../career/workplace/workplace.model";
import { AddressEntity } from "../../address/address/address.model";
import { CountryEntity } from "../../address/country/country.model";
import { PersonCategoryEntity } from "../person-category/person-category.model";

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
  address: AddressEntity;
  workplace: WorkplaceEntity;
  school: SchoolEntity;
  personcategory: PersonCategoryEntity;
  contact: ContactEntity;
  countries: CountryEntity[];
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

export interface Person_Country {
  person_country: string;
  person_id: string;
  country_id: string;
}