import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Interest } from './store/app/app.model';
import { Observable } from 'rxjs';
import { AppStateModel } from './store/app/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss'],
  host: { 'class': 'flex-column' }
})
export class AppComponent implements AfterViewInit {
  title = 'cv-angular';
  @HostBinding('style')
  get style_binding() {
    return {
      '--customcolor': this.customcolor,
      '--customcolordarken': this.customcolordarken,
    };
  }
  customcolor = '';
  customcolordarken = '';
  backgroundclass = '';
  interest$: Observable<Interest>;

  constructor(@Inject(DOCUMENT) private document: Document, private store: Store) {
    this.interest$ = this.store.select(state => state.app.interest);
    this.interest$.subscribe(res => {
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

      this.document.body.id = res;
    })
  }

  ngAfterViewInit() {
    this.document.body.classList.add('loaded');
    
    /*this.interest$.subscribe(res => {
      this.customcolor = res == Interest.IT ? 'rgba(103, 176, 232, 0.9)'
        : res == Interest.ART ? 'rgba(196, 127, 213, 0.9)'
          : res == Interest.EDUCATION ? 'rgba(140, 207, 126, 0.9)'
            : res == Interest.GENERAL ? 'rgba(108, 191, 191, 0.9)'
              : res == Interest.HEALTH ? 'rgba(229, 116, 116, 0.9)'
                : 'rgba(229, 199, 107, 0.9)'})*/
  }
}
