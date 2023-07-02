import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageComp } from '../../components.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
  @Input() images!: ImageComp[];
  current: number = 0;

  constructor() { }

  showSlide(pos: number) {
    if (pos < 0) {
      this.current = this.images.length - 1;
    } else if (pos > this.images.length - 1) {
      this.current = 0;
    } else {
      this.current = pos;
    }
  }
}
