import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './components/general/header/header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppState } from './store/app/app.state';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './components/general/select/select.component';
import { PersonComponent } from './components/general/person/person.component';

@NgModule({
  declarations: [AppComponent, PersonComponent],
  imports: [
    AppRoutingModule,
    NgxsModule.forRoot([AppState]),
    AngularFireModule.initializeApp(environment.firebase),
    /*AngularFireStorageModule,*/
    BrowserModule,
    HeaderComponent,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule { }
