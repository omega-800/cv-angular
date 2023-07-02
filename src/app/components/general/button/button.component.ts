import { Component, Input } from '@angular/core';
import { LinkType } from '../../components.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() onClick!: () => void;

  @Input() type!: LinkType;
  @Input() name!: string;
}
