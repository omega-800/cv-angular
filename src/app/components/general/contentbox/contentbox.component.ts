import { Component, Input } from '@angular/core';
import { ImageComponent } from '../../components.model';

@Component({
  selector: 'app-contentbox',
  templateUrl: './contentbox.component.html',
  styleUrls: ['./contentbox.component.scss']
})
export class ContentboxComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: ImageComponent;

  constructor () {}
}
