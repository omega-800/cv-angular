import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactEntity } from 'src/app/services/contact/contact.model';
import { LinkTypes } from '../../components.model';
import { contactPhone, contactMail } from '../links.util';
import { linkTypes } from '../../components.constants';

@Component({
  selector: 'app-contactpoint',
  templateUrl: './contactpoint.component.html',
  styleUrls: ['./contactpoint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex-e2e' }
})
export class ContactpointComponent {
  @Input() contact!: ContactEntity;
  lt: LinkTypes = linkTypes;

  constructor() { }

  cp = (phone: string) => {
    return () => contactPhone(phone);
  }
  cm = (mail: string) => {
    return () => contactMail(mail, '', '');
  }
}
