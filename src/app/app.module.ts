import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './components/general/header/header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    /*NgxsModule.forRoot([FilterState]),*/
    AngularFireModule.initializeApp(environment.firebase),
    /*AngularFireStorageModule,*/
    BrowserModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule { }
