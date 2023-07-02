import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SkillsFilterPipe } from './pipes/skills-filter/skills-filter.pipe';
import { NgxsModule } from '@ngxs/store';
import { FilterState } from './store/filter/filter.state';
import { environment } from 'src/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/general/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    NgxsModule.forRoot([FilterState]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
