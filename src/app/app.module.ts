import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CareerComponent } from './career/career.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SocialsButtonComponent } from './socials-button/socials-button.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SkillsPercentComponent } from './skills/skills-percent/skills-percent.component';
import { SkillItemComponent } from './skills/skill-item/skill-item.component';
import { SkillcategoryPercentComponent } from './skills/skillcategory-percent/skillcategory-percent.component';
import { SkillsPercentListComponent } from './skills/skills-percent-list/skills-percent-list.component';
import { FilterComponent } from './filter/filter.component';
import { SkillsFilterPipe } from './pipes/skills-filter/skills-filter.pipe';
import { AgePipe } from './pipes/age/age.pipe';

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
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
