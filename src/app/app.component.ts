import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Inject, OnInit, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Interest } from './store/app/app.model';
import { Observable, map } from 'rxjs';
import { AppStateModel } from './store/app/app.state';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';
import { SetInterest } from './store/app/app.actions';
import { slideInAnimation } from './animations';

export interface URLParams {
  interest?: Interest,
  language?: string,
  projectID?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  /*@HostBinding('style')
  get style_binding() {
    return {
      '--customcolor': this.customcolor,
      '--customcolordarken': this.customcolordarken,
    };
  }*/

  customcolor = '';
  customcolordarken = '';
  backgroundclass = '';
  //interest$: Observable<Interest>;
  title = 'cv-angular';

  constructor(@Inject(DOCUMENT) private document: Document, private store: Store, private activatedRoute: ActivatedRoute) {
    //this.interest$ = this.store.select(state => state.app.interest);
    this.store.select(state => state.app.interest).subscribe(res => {
      this.customcolor = res == Interest.IT ? 'rgba(103, 176, 232, 0.9)'
        : res == Interest.ART ? 'rgba(196, 127, 213, 0.9)'
          : res == Interest.EDUCATION ? 'rgba(140, 207, 126, 0.9)'
            : res == Interest.HEALTH ? 'rgba(108, 191, 191, 0.9)'
              : res == Interest.GENERAL ? 'rgba(229, 116, 116, 0.9)'
                : 'rgba(229, 199, 107, 0.9)'

      this.customcolordarken = res == Interest.IT ? 'hsla(206, 74%, 51%, 0.9)'
        : res == Interest.ART ? 'hsla(288, 51%, 52%, 0.9)'
          : res == Interest.EDUCATION ? 'hsla(110, 46%, 50%, 0.9)'
            : res == Interest.HEALTH ? 'hsla(180, 39%, 44%, 0.9)'
              : res == Interest.GENERAL ? 'hsla(0, 68%, 53%, 0.9)'
                : 'hsla(45, 70%, 51%, 0.9)'

      this.document.body.id = "selected-" + res;
      this.document.body.style.setProperty('--customcolor', this.customcolor)
      this.document.body.style.setProperty('--customcolordarken', this.customcolordarken)
    })
  }

  ngOnInit() {
    this.document.body.classList.add('loaded');
  }

  /*getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }*/
}
