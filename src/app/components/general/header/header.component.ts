import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Interest } from 'src/app/store/app/app.model';
import { interestTypes } from 'src/app/store/app/app.model';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
    this.store.select(state => state.app.interest).subscribe(res => { this.interest = res; this.interestIcon = this.types.find(t => t.type == res)!.icon });
  }
  /*
    ngOnInit() {
      this.activatedRoute.params.subscribe(res => {
        console.log(res)
        let interestParam = res['interest'];
        console.log(interestParam)
        let checkedInterest: Interest = interestParam != null && Object.values(Interest).includes(interestParam as Interest) ? interestParam as Interest : Interest.IT
        this.store.dispatch(new SetInterest(checkedInterest))
      })
    }
  */
  setInterest(interest: Interest) {
    let checkedInterest = interest != undefined && Object.values(Interest).includes(interest) ? interest : Interest.IT;
    this.router.navigate(['.', { interest: checkedInterest }]);
    this.store.dispatch(new SetInterest(checkedInterest))
  }
}
