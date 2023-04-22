import { Entity } from "../../entities.model";
import { CountryEntity } from "../country/country.model";

export interface AddressEntity extends Entity {
    address_id: string;
    street: string;
    city: string;
    zip: number;
    country: CountryEntity;
}

export interface AddressOnly {
  address_id: string;
  street: string;
  city: string;
  zip: number;
  country_id: string;
}