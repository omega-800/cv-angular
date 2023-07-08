import { Component, Input } from '@angular/core';
import { ImageComp, URLComp } from '../../components.model';
import { openLink } from '../links.util';
import { Direction } from '../../components.constants';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() name!: string;
  @Input() direction!: Direction;
  @Input() description?: string;
  @Input() icon?: ImageComp;
  @Input() link?: URLComp;

  ol = (href: string) => {
    return () => openLink(href);
  };
}
