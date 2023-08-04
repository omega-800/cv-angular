import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Interest } from 'src/app/store/app/app.model';
import { interestTypes } from 'src/app/store/app/app.model';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SetInterest } from 'src/app/store/app/app.actions';
import { Direction } from '../../components.constants';
import { ImageComp } from '../../components.model';
import { DropDownAnimation } from 'src/app/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TooltipComponent, NgFor, RouterLink, RouterLinkActive, NgIf],
  animations: [DropDownAnimation]
})
export class HeaderComponent {
  types = interestTypes;
  interest = '';
  interestIcon: ImageComp = this.types[0].icon;
  d = Direction;
  dropdownActive: boolean = false;

  constructor(private store: Store, private router: Router) {
    this.store.select(state => state.app.interest).subscribe(res => { this.interest = res; this.interestIcon = this.types.find(t => t.type == res)!.icon });
  }

  setInterest(interest: Interest) {
    this.router.navigate([], {
      queryParams: { interest: interest },
      queryParamsHandling: 'merge',
    });
  }
}
