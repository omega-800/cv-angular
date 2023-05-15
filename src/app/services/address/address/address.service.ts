import { Injectable } from '@angular/core';
import * as addressData from 'src/data/address.json';
import { AddressEntity, AddressOnly } from './address.model';
import { CountryService } from '../country/country.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private onlyAddresses: AddressOnly[] = (addressData as any).default;
  private addresses: AddressEntity[];

  constructor(private countryService: CountryService) {
    this.addresses = this.onlyAddresses.map(address => { return { ...address, id: "address_" + address.address_id, name: address.street, country: countryService.getCountryById(address.country_id) } })
  }

  getAddressById(id: string): AddressEntity {
    return Object.values(this.addresses).filter(address => address.address_id === id)[0];
  }
}
