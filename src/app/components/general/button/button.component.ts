import { Component, Input } from '@angular/core';
import { LinkType, LinkTypes } from '../../components.model';
import { linkTypes } from '../../components.constants';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() onClick!: () => void;

  @Input() type!: LinkType;
  @Input() name!: string;
  lt: LinkTypes = linkTypes;
  /*
  public href: string = "";

  ngOnInit() {
    this.href = this.type.prefix + this.link;
  }*/

}
