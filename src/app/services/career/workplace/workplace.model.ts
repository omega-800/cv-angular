import { AddressEntity } from "../../address/address/address.model";
import { ContactEntity } from "../../contact/contact.model";
import { ContentEntity } from "../../entities.model";

export interface WorkplaceEntity extends ContentEntity {
  workplace_id: string;
  legalname: string;
  foundingdate: string;
  founder: string;
  address: AddressEntity;
  contactpoints: ContactEntity[];
}

export interface WorkplaceOnly {
  workplace_id: string;
  legalname: string;
  foundingdate: string;
  founder: string;
  description: string;
  description_e: string;
  description_r: string;
  name: string;
  name_e: string;
  name_r: string;
  url: string;
  logo: string;
  image: string;
  address_id: string;
}

export interface Workplace_Contact {
  workplace_contactpoint_id: string;
  contactpoint_id: string;
  workplace_id: string;
}