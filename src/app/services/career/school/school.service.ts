import { Injectable } from '@angular/core';
import * as schoolData from 'src/data/school.json'
import * as school_contactData from 'src/data/school_contactpoint.json'
import { SchoolEntity, SchoolOnly, School_Contact } from './school.model';
import { AddressService } from '../../address/address/address.service';
import { ContactService } from '../../contact/contact.service';
import { ContactEntity } from '../../contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  onlySchools:SchoolOnly[] = (schoolData as any).default;
  schoolContactLinks:School_Contact[] = (school_contactData as any).default;
  schools:SchoolEntity[];

  constructor(addressService:AddressService, contactService:ContactService) { 
    this.schools = this.onlySchools.map(school => this.fillSchool(school, addressService, contactService)) 
  }

  fillSchool(school:SchoolOnly, addressService:AddressService, contactService:ContactService):SchoolEntity {
    let contacts:ContactEntity[] = this.schoolContactLinks.filter(link => link.school_id == school.school_id).map(link => contactService.getContactById(link.contactpoint_id))
    return {...school, id:"school_"+school.school_id, thumbnail:school.logo, address:addressService.getAddressById(school.address_id), contactpoints: contacts}
  }

  getSchoolById(id:string):SchoolEntity {
    return Object.values(this.schools).filter(school => school.school_id === id)[0]; 
  }
}
