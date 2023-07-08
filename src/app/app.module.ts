import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './components/general/header/header.component';

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
})
export class AppModule {}
