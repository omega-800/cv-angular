import { AfterContentInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageComp } from '../../components.model';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex-center' },
  standalone: true,
  imports: [NgStyle, NgIf]
})
export class ImageComponent implements AfterContentInit {
  @Input() image!: ImageComp;
  loaded: boolean = false;
  isNotSVG: boolean = false;
  ngOnInit() {
    this.isNotSVG = !this.image.path.endsWith('svg');
  }
  ngAfterContentInit() {
    this.loaded = true;
  }
}
