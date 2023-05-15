import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/views/home/home.component';
import { CareerComponent } from './components/views/career/career.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FormsModule } from '@angular/forms';
import { SkillsPercentComponent } from './components/general/skills/skills-percent/skills-percent.component';
import { SkillItemComponent } from './components/general/skills/skill-item/skill-item.component';
import { SkillcategoryPercentComponent } from './components/general/skills/skillcategory-percent/skillcategory-percent.component';
import { SkillsPercentListComponent } from './components/general/skills/skills-percent-list/skills-percent-list.component';
import { FilterComponent } from './components/general/filter/filter.component';
import { SkillsFilterPipe } from './pipes/skills-filter/skills-filter.pipe';
import { AgePipe } from './pipes/age/age.pipe';
import { NgxsModule } from '@ngxs/store';
import { FilterState } from './store/filter/filter.state';
import { ContentboxComponent } from './components/general/contentbox/contentbox.component';
import { CarouselComponent } from './components/general/carousel/carousel.component';
import { ContactpointComponent } from './components/general/contactpoint/contactpoint.component';
import { ButtonComponent } from './components/general/button/button.component';
import { AddressComponent } from './components/general/address/address.component';
import { ProjectsComponent } from './components/views/projects/projects.component';
import { environment } from 'src/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ImageComponent } from './components/general/image/image.component';
import { SkillsSortPipe } from './pipes/skills-sort/skills-sort.pipe';
import { SortComponent } from './components/general/sort/sort.component';
import { ProjectsSortPipe } from './pipes/projects-sort/projects-sort.pipe';
import { DatePipe } from './pipes/date/date.pipe';
import { ProjectsFilterPipe } from './pipes/projects-filter/projects-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareerComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SkillsPercentComponent,
    SkillItemComponent,
    SkillcategoryPercentComponent,
    SkillsPercentListComponent,
    FilterComponent,
    SkillsFilterPipe,
    AgePipe,
    ContentboxComponent,
    CarouselComponent,
    ContactpointComponent,
    ButtonComponent,
    AddressComponent,
    ProjectsComponent,
    ImageComponent,
    SkillsSortPipe,
    SortComponent,
    ProjectsSortPipe,
    DatePipe,
    ProjectsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([FilterState]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [SkillsFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
