import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AddressEntity } from 'src/app/services/address/address/address.model';
import { addressIcon, linkTypes } from '../../components.constants';
import { ImageComp, LinkTypes } from '../../components.model';
import { openLink } from '../links.util';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex-e2e' },
  standalone: true,
  imports: [ButtonComponent]
})
export class AddressComponent {
  @Input() address!: AddressEntity;
  addressIcon: ImageComp = addressIcon;
  lt: LinkTypes = linkTypes;

  map = (address: AddressEntity) => {
    openLink(encodeURI(this.lt.MAP.prefix + address.street + ", " + address.zip + " " + address.city + ", " + address.country.name));
  }
}

