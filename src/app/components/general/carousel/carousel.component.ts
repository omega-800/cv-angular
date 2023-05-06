import { Component, Input } from '@angular/core';
import { ImageComponent } from '../../components.model';
import { arrowIcon } from '../../components.constants';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() images!:ImageComponent[];
  current:number = 0;
  arrowIcon:ImageComponent = arrowIcon;

  constructor(){}

  showSlide(pos:number){
    if(pos < 0){
      this.current = this.images.length-1;
    } else if (pos > this.images.length-1){
      this.current = 0;
    } else {
      this.current = pos;
    }
  }
}
