import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-socials-button',
  templateUrl: './socials-button.component.html',
  styleUrls: ['./socials-button.component.scss']
})
export class SocialsButtonComponent {
  @Input() link!: string;
  @Input() type!: string;
  @Input() image!: string;
  @Input() name!: string;
  
  public href: string = "";

  ngOnInit() {
    this.href = this.type == "mail" ? "mailto:"+this.link
    : this.type == "tel" ? "tel:"+this.link
    : this.link;
  }
}
