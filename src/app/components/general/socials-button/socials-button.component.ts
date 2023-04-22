import { Component, Input } from '@angular/core';
import { linkTypes, LinkType, LinkTypes } from 'src/app/components/components.model';
@Component({
  selector: 'app-socials-button',
  templateUrl: './socials-button.component.html',
  styleUrls: ['./socials-button.component.scss']
})
export class SocialsButtonComponent {
  @Input() link!: string;
  @Input() type!: LinkType;
  @Input() name!: string;
  
  public href: string = "";

  ngOnInit() {
    this.href = this.type.prefix + this.link;
  }
}
