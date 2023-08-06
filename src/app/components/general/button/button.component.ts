import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { ImageComp, LinkType, LinkTypes } from '../../components.model';
import { Direction, authMessage, linkTypes, lockIcon, loginMessage } from '../../components.constants';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'flex-center buttonpill' },
  standalone: true,
  imports: [TooltipComponent, NgIf]
})
export class ButtonComponent {
  @Input() type!: LinkType;
  @Input() name!: string;
  @Input() image?: ImageComp;
  @Input() showName?: boolean;
  @Input() locked?: boolean;
  @Input() lockedMessage?: string;
  showTooltip = false;
  lockIcon = lockIcon;

  lt: LinkTypes = linkTypes;
  d = Direction;

  @HostBinding('class')
  get class_binding() {
    return this.locked ? 'locked' : 'link'
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showTooltip = false;
  }
}
