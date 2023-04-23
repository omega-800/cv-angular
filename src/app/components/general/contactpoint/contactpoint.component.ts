import { Component, Input } from '@angular/core';
import { ContactEntity } from 'src/app/services/contact/contact.model';
import { LinkTypes, linkTypes } from '../../components.model';
import { contactPhone, contactMail } from '../links.util';

@Component({
  selector: 'app-contactpoint',
  templateUrl: './contactpoint.component.html',
  styleUrls: ['./contactpoint.component.scss']
})
export class ContactpointComponent {
  @Input() contact!:ContactEntity;
  lt:LinkTypes=linkTypes;

  constructor() {}

  cp = (phone:string) => {
    return () => contactPhone(phone);
  }
  cm = (mail:string) => {
    return () => contactMail(mail,'','');
  }
}
