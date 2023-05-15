import { AddressEntity } from "../../address/address/address.model";
import { ContactEntity } from "../../contact/contact.model";
import { ContentEntity } from "../../entities.model";

export interface SchoolEntity extends ContentEntity {
  school_id: string;
  type: string;
  type_e: string;
  type_d: string;
  address: AddressEntity;
  contactpoints: ContactEntity[];
}

export interface SchoolOnly {
  school_id: string;
  type: string;
  type_e: string;
  type_d: string;
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

export interface School_Contact {
  school_contactpoint_id: string;
  contactpoint_id: string;
  school_id: string;
}