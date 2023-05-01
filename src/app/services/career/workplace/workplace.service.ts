import { Injectable } from '@angular/core';
import * as workplaceData from 'src/data/workplace.json'
import * as workplace_contactData from 'src/data/workplace_contactpoint.json'
import { WorkplaceEntity, WorkplaceOnly, Workplace_Contact } from './workplace.model';
import { AddressService } from '../../address/address/address.service';
import { ContactService } from '../../contact/contact.service';
import { ContactEntity } from '../../contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {
  onlyWorkplaces:WorkplaceOnly[] = (workplaceData as any).default;
  workplaceContactLinks:Workplace_Contact[] = (workplace_contactData as any).default;
  workplaces:WorkplaceEntity[];

  constructor(addressService:AddressService, contactService:ContactService) { 
    this.workplaces = this.onlyWorkplaces.map(workplace => this.fillWorkplace(workplace, addressService, contactService)) 
  }

  fillWorkplace(workplace:WorkplaceOnly, addressService:AddressService, contactService:ContactService):WorkplaceEntity {
    let contacts:ContactEntity[] = this.workplaceContactLinks.filter(link => link.workplace_id === workplace.workplace_id).map(link => contactService.getContactById(link.contactpoint_id))
    return {...workplace, id:"workplace_"+workplace.workplace_id, thumbnail:workplace.logo, address:addressService.getAddressById(workplace.address_id), contactpoints: contacts}
  }
  getWorkplaceById(id:string):WorkplaceEntity {
    return Object.values(this.workplaces).filter(workplace => workplace.workplace_id === id)[0]; 
  }
}
