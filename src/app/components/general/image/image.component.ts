import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageComp } from '../../components.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex-center' },
  standalone: true,
  imports: [NgStyle]
})
export class ImageComponent implements AfterContentInit {
  @Input() image!: ImageComp;
  loaded: boolean = false;
  ngAfterContentInit() {
    this.loaded = true;
  }
}
