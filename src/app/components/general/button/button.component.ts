import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageComp, LinkType, LinkTypes } from '../../components.model';
import { Direction, linkTypes } from '../../components.constants';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex-center' }
})
export class ButtonComponent {
  @Input() onClick!: () => void;

  @Input() type!: LinkType;
  @Input() name!: string;
  @Input() image?: ImageComp;
  @Input() showName?: boolean;

  lt: LinkTypes = linkTypes;
  d = Direction;
}
