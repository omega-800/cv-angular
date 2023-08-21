import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { ImageComp } from '../../components.model';
import { NgIf, NgStyle } from '@angular/common';
import { ScreenVars, screenVariables } from '../../components.constants';
import { zoomInIcon, zoomOutIcon } from '../../icons.constants';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-center' },
  standalone: true,
  imports: [NgStyle, NgIf],
})
export class ImageComponent implements AfterContentInit {
  @Input() image!: ImageComp;
  loaded: boolean = false;
  isNotSVG: boolean = false;
  zoomInIcon = zoomInIcon;
  zoomOutIcon = zoomOutIcon;
  isZoomedIn = false;
  hovering = false;
  screenVariables = screenVariables;

  constructor(private elRef: ElementRef) { }
  ngOnInit() {
    this.isNotSVG = !this.image.path.endsWith('svg');
  }
  ngAfterContentInit() {
    this.loaded = true;
    this.calculateSize()
  }

  calculateSize() {
    let imageElem = this.elRef.nativeElement.querySelectorAll(".img-main")[0]

    imageElem.onload = () => {
      let h = imageElem.naturalHeight
      let w = imageElem.naturalWidth
      if (h > w) {
        this.elRef.nativeElement.style.setProperty('--heightfull', '100%');
        this.elRef.nativeElement.style.setProperty('--widthfull', `${w / h * 100}%`);
      } else {
        this.elRef.nativeElement.style.setProperty('--heightfull', `${h / w * 100}%`);
        this.elRef.nativeElement.style.setProperty('--widthfull', '100%');
      }
    }
  }
}
