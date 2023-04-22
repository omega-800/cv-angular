import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/views/home/home.component';
import { CareerComponent } from './components/views/career/career.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { SocialsButtonComponent } from './components/general/socials-button/socials-button.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FormsModule } from '@angular/forms';
import { SkillsPercentComponent } from './components/general/skills/skills-percent/skills-percent.component';
import { SkillItemComponent } from './components/general/skills/skill-item/skill-item.component';
import { SkillcategoryPercentComponent } from './components/general/skills/skillcategory-percent/skillcategory-percent.component';
import { SkillsPercentListComponent } from './components/general/skills/skills-percent-list/skills-percent-list.component';
import { FilterComponent } from './components/general/filter/filter.component';
import { SkillsFilterPipe } from './pipes/skills-filter/skills-filter.pipe';
import { AgePipe } from './pipes/age/age.pipe';
import { ListComponent } from './components/general/list/list.component';
import { NgxsModule } from '@ngxs/store';
import { FilterState } from './store/filter/filter.state';
import { ContentboxComponent } from './components/general/contentbox/contentbox.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareerComponent,
    PageNotFoundComponent,
    SocialsButtonComponent,
    HeaderComponent,
    SkillsPercentComponent,
    SkillItemComponent,
    SkillcategoryPercentComponent,
    SkillsPercentListComponent,
    FilterComponent,
    SkillsFilterPipe,
    AgePipe,
    ListComponent,
    ContentboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([FilterState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
