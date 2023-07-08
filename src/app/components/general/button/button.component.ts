import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageComp, LinkType } from '../../components.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() onClick!: () => void;

  @Input() type!: LinkType;
  @Input() name!: string;
  @Input() image?: ImageComp;
}
