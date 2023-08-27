import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { ImageComp } from '../../components.model';
import { NgIf, NgStyle } from '@angular/common';
import { screenVariables } from '../../components.constants';
import { zoomInIcon, zoomOutIcon } from '../../icons.constants';
import { FadeAnimation } from 'src/app/animations';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  host: { class: 'flex-center' },
  standalone: true,
  imports: [NgStyle, NgIf],
  animations: [FadeAnimation]
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

  constructor(private cdref: ChangeDetectorRef, private elRef: ElementRef) { }
  ngOnInit() {
    this.isNotSVG = !this.image.path.endsWith('svg');
  }
  ngAfterContentInit() {
    this.calculateSize()
  }
  ngAfterContentChecked() {
  }

  calculateSize() {
    let imageElem = this.elRef.nativeElement.querySelectorAll(".img-main")[0]

    imageElem.onload = () => {
      let sr = window.innerHeight / window.innerWidth;

      let h = imageElem.naturalHeight;
      let w = imageElem.naturalWidth;
      let r = h / w;

      this.elRef.nativeElement.style.setProperty('--heightfull', sr > r ? `${r / sr * 100}%` : '100%');
      this.elRef.nativeElement.style.setProperty('--widthfull', sr > r ? '100%' : `${sr / r * 100}%`);
      this.elRef.nativeElement.style.setProperty('--height', h > w ? '100%' : `${h / w * 100}%`);
      this.elRef.nativeElement.style.setProperty('--width', h > w ? `${w / h * 100}%` : '100%');
      imageElem.classList.add('loaded');
      this.loaded = true;
      this.cdref.detectChanges();
    }
  }
}
