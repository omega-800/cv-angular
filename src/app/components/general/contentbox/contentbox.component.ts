import { Component, Input } from '@angular/core';
import { ImageComponent } from '../../components.model';
import { arrowIcon } from '../../components.constants';

@Component({
  selector: 'app-contentbox',
  templateUrl: './contentbox.component.html',
  styleUrls: ['./contentbox.component.scss']
})
export class ContentboxComponent {
  @Input() title!: string;
  @Input() subTitle?: string;
  @Input() description!: string;
  @Input() link?: string;
  @Input() image!: ImageComponent;
  @Input() imagePreview?: ImageComponent;
  arrowIcon:ImageComponent = arrowIcon;
  images:string[];

  constructor () {
    this.images = [];
  }

  ngOnInit(){
    if(this.image.path.endsWith("/")){

    }
  }
}
