import { Component, Input } from '@angular/core';
import { AddressEntity } from 'src/app/services/address/address/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  @Input() address!:AddressEntity;

}
