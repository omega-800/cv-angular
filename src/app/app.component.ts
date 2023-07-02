import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cv-angular';
  constructor(@Inject(DOCUMENT) private document: Document) { }
  ngAfterViewInit() {
    this.document.body.classList.add('loaded');
  }
}
