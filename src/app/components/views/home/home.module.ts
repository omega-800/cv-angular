import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { AgePipe } from 'src/app/pipes/age/age.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    AgePipe
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
    AgePipe
  ]
})
export class HomeModule { }
