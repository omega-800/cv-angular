import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, } from '@angular/core';
import { Store } from '@ngxs/store';
import { Interest } from './store/app/app.model';
import { filter, map, take } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
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

  constructor(@Inject(DOCUMENT) private document: Document, private store: Store, private router: Router) {
    //this.interest$ = this.store.select(state => state.app.interest);
    let savedInterest = localStorage.getItem('interest')
    if (!!savedInterest) {
      let checkedInterest = savedInterest != undefined && Object.values(Interest).includes(savedInterest as Interest) ? savedInterest : Interest.IT;
      this.store.dispatch(new SetInterest(checkedInterest as Interest))
    } else {
      this.router.events
        .pipe(
          filter(e => (e instanceof ActivationEnd) && (Object.keys(e.snapshot.params).length > 0)),
          map(e => e instanceof ActivationEnd ? e.snapshot.params : {}),
          take(1)
        )
        .subscribe(params => {
          let checkedInterest = params['interest'] != undefined && Object.values(Interest).includes(params['interest']) ? params['interest'] : Interest.IT;
          this.store.dispatch(new SetInterest(checkedInterest))
        });
    }
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
}
