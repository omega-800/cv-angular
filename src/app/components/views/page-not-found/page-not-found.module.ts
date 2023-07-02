import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
