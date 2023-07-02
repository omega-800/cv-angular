import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CareerComponent } from './career.component';
import { CareerRoutingModule } from './career-routing.module';



@NgModule({
  declarations: [
    CareerComponent
  ],
  imports: [
    SharedModule,
    CareerRoutingModule
  ]
})
export class CareerModule { }
