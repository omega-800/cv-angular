import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ImageComp, URLComp } from '../../components.model';
import { openLink } from '../links.util';
import { Direction } from '../../components.constants';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf]
})
export class TooltipComponent {
  @Input() name!: string;
  @Input() direction!: Direction;
  @Input() description?: string;
  @Input() icon?: ImageComp;
  @Input() link?: URLComp;

  constructor(private elRef: ElementRef) { }

  ol = (href: string) => {
    return () => openLink(href);
  };

  /*getLeftMargin(): number {
    console.log(this.elRef.nativeElement.parentElement);
    console.log(window.innerWidth - this.elRef.nativeElement.parentElement.getBoundingClientRect().left)
    return window.innerWidth - this.elRef.nativeElement.parentElement.getBoundingClientRect().left;
  }*/
}
