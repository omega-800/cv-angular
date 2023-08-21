import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { ImageComp, URLComp } from '../../components.model';
import { openLink } from '../links.util';
import { Direction, ScreenVars, screenVariables } from '../../components.constants';
import { NgStyle, NgIf } from '@angular/common';
import { TooltipAnimation } from 'src/app/animations';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgStyle],
  animations: [TooltipAnimation]
})
export class TooltipComponent {
  @Input() name!: string;
  @Input() direction!: Direction;
  @Input() description?: string;
  @Input() icon?: ImageComp;
  @Input() link?: URLComp;
  visible: boolean = false;
  screenVariables = screenVariables;

  @HostBinding('class')
  get class_binding() {
    return 'is-' + this.direction
  }

  constructor(private elRef: ElementRef) {
  }

  ol(href: string) {
    openLink(href);
  };

  getLeftMargin() {
    let parentElemBounds = this.elRef.nativeElement.parentElement.getBoundingClientRect();
    let screenWidth = window.innerWidth;
    let parentElemMiddleFromLeft = parentElemBounds.left + ((parentElemBounds.right - parentElemBounds.left) / 2)

    this.elRef.nativeElement.style.setProperty('--parentheight', `${parentElemBounds.bottom - parentElemBounds.top}px`);
    this.elRef.nativeElement.style.setProperty('--marginright', '0px');
    this.elRef.nativeElement.style.setProperty('--marginleft', '0px');

    let prevElem: keyof ScreenVars;
    for (const [key, { breakpoint, wrapper, tooltipWidth }] of Object.entries(this.screenVariables)) {
      if (screenWidth <= breakpoint && (prevElem! != undefined ? screenWidth > this.screenVariables[prevElem].breakpoint : true)) {
        let wrapperPadding = (screenWidth - (screenWidth * wrapper / 100)) / 4
        let tooltipHalfWidthPx = screenWidth * tooltipWidth / 100 / 2
        let remainingSizeRight = screenWidth - parentElemMiddleFromLeft - wrapperPadding
        let remainingSizeLeft = parentElemMiddleFromLeft - wrapperPadding
        if (remainingSizeRight < tooltipHalfWidthPx) {
          let overshotBy = tooltipHalfWidthPx - remainingSizeRight
          this.elRef.nativeElement.style.setProperty('--marginright', `${overshotBy}px`);
        } else if (remainingSizeLeft < tooltipHalfWidthPx) {
          let overshotBy = tooltipHalfWidthPx - remainingSizeLeft
          this.elRef.nativeElement.style.setProperty('--marginleft', `${overshotBy}px`);
        }
        this.elRef.nativeElement.style.setProperty('--tooltipwidth', `${tooltipWidth}vw`);
      }
      prevElem = key;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.visible = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.visible = false;
  }

  /*@HostListener('click') onClick() {
    this.visible = !this.visible;
  }*/

}
