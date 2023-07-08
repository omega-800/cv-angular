import { Injectable } from '@angular/core';
import * as workplaceData from 'src/data/workplace.json';
import * as workplace_contactData from 'src/data/workplace_contactpoint.json';
import {
  WorkplaceEntity,
  WorkplaceOnly,
  Workplace_Contact,
} from './workplace.model';
import { AddressService } from '../../address/address/address.service';
import { ContactService } from '../../contact/contact.service';
import { ContactEntity } from '../../contact/contact.model';

@Injectable({
  providedIn: 'root',
})
export class WorkplaceService {
  private onlyWorkplaces: WorkplaceOnly[] = (workplaceData as any).default;
  private workplaceContactLinks: Workplace_Contact[] = (
    workplace_contactData as any
  ).default;
  private workplaces: WorkplaceEntity[];

  constructor(
    private addressService: AddressService,
    private contactService: ContactService
  ) {
    this.workplaces = this.onlyWorkplaces.map((workplace) =>
      this.fillWorkplace(workplace)
    );
  }

  fillWorkplace(workplace: WorkplaceOnly): WorkplaceEntity {
    let contacts: ContactEntity[] = this.workplaceContactLinks
      .filter((link) => link.workplace_id === workplace.workplace_id)
      .map((link) => this.contactService.getContactById(link.contactpoint_id));
    return {
      ...workplace,
      id: 'workplace_' + workplace.workplace_id,
      thumbnail: {
        id: 'logo_' + workplace.workplace_id,
        name: 'Logo ' + workplace.name,
        alt: 'Logo ' + workplace.name,
        path: workplace.logo,
      },
      image: {
        id: 'logo_' + workplace.workplace_id,
        name: 'Logo ' + workplace.name,
        alt: 'Logo ' + workplace.name,
        path: workplace.image,
      },
      address: this.addressService.getAddressById(workplace.address_id),
      contactpoints: contacts,
    };
  }
  getWorkplaceById(id: string): WorkplaceEntity {
    return Object.values(this.workplaces).filter(
      (workplace) => workplace.workplace_id === id
    )[0];
  }
}
