import { Component, Input, OnInit } from '@angular/core';
import { ImageComponent } from '../../components.model';
import { arrowIcon } from '../../components.constants';

@Component({
  selector: 'app-contentbox',
  templateUrl: './contentbox.component.html',
  styleUrls: ['./contentbox.component.scss']
})
export class ContentboxComponent implements OnInit{
  @Input() title!: string;
  @Input() subTitle?: string;
  @Input() description!: string;
  @Input() link?: string;
  @Input() images!: ImageComponent[];
  @Input() imagePreview?: ImageComponent;
  arrowIcon:ImageComponent = arrowIcon;
  isCarousel:boolean = false;

  constructor () {}

  ngOnInit(){
    if(this.images.length > 1){
      this.isCarousel = true;
    }
  }
}
