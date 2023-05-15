import { Entity } from "src/app/services/entities.model";

export interface ContactEntity extends Entity {
  contactpoint_id: string;
  name_e: string;
  name_r: string;
  phone: string;
  email: string;
}

export interface ContactOnly {
  contactpoint_id: string;
  name: string;
  name_e: string;
  name_r: string;
  phone: string;
  email: string;
}