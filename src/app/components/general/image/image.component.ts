import { Component, Input } from '@angular/core';
import { ImageComp } from '../../components.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image!: ImageComp;
}
