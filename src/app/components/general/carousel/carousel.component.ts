import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ImageComp } from '../../components.model';
import { ImageComponent } from '../image/image.component';
import { NgFor, NgIf } from '@angular/common';
import { CarouselAnimation, TooltipAnimation } from 'src/app/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ImageComponent, NgFor, NgIf],
  animations: [CarouselAnimation]
})
export class CarouselComponent {
  @Input() images!: ImageComp[];
  current: number = 0;
  slidingTo = 'left';
  xDown?: number;
  yDown?: number;
  xDiff?: number;
  yDiff?: number;

  constructor(private elRef: ElementRef) { }

  showSlide(pos: number) {
    this.slidingTo = this.current > pos ? 'left' : 'right';
    if (pos < 0) {
      this.current = this.images.length - 1;
    } else if (pos > this.images.length - 1) {
      this.current = 0;
    } else {
      this.current = pos;
    }
  }

  touchStart(event: TouchEvent) {
    this.xDown = event.changedTouches[0].clientX;
    this.yDown = event.changedTouches[0].clientY;
  }
  touchEnd() {
    if (this.xDiff && this.yDiff && Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
      this.xDiff > 0 ? this.showSlide(this.current + 1) : this.showSlide(this.current - 1);
    } else {
      this.touchCancel();
    }

    this.xDiff = undefined;
    this.yDiff = undefined;
    this.xDown = undefined;
    this.yDown = undefined;
  }
  touchCancel() {
    let imgElem = this.elRef.nativeElement.querySelectorAll('.carousel > .slide > app-image')[0];
    imgElem.style.setProperty('transform', `translateX(0)`)
  }
  touchMove(event: TouchEvent) {
    if (!this.xDown || !this.yDown) return

    this.xDiff = this.xDown - event.touches[0].clientX;
    this.yDiff = this.yDown - event.touches[0].clientY;

    let imgElem = this.elRef.nativeElement.querySelectorAll('.carousel > .slide > app-image')[0];
    imgElem.style.setProperty('transform', `translateX(${event.changedTouches[0].clientX - this.xDown}px)`)
  }
}
