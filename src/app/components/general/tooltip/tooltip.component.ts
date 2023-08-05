import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ImageComp, URLComp } from '../../components.model';
import { openLink } from '../links.util';
import { Direction } from '../../components.constants';
import { NgStyle, NgIf } from '@angular/common';
import { TooltipAnimation } from 'src/app/animations';


export interface ScreenVars {
  [name: string]: {
    breakpoint: number;
    wrapper: number;
    tooltipWidth: number;
  }
}

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
  @Input() visible!: boolean;
  @Input() description?: string;
  @Input() icon?: ImageComp;
  @Input() link?: URLComp;

  screenVariables: ScreenVars = {
    mobile: {
      breakpoint: 480,
      wrapper: 90,
      tooltipWidth: 80
    },
    tablet: {
      breakpoint: 768,
      wrapper: 90 / 1.2,
      tooltipWidth: 70
    },
    laptop: {
      breakpoint: 1024,
      wrapper: 90 / 1.3,
      tooltipWidth: 60
    },
    desktop: {
      breakpoint: 1200,
      wrapper: 90 / 1.5,
      tooltipWidth: 50
    },
    large: {
      breakpoint: 99999,
      wrapper: 90 / 1.7,
      tooltipWidth: 30
    },
  } as const

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
}
